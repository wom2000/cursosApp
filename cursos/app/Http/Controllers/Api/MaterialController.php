<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       $query = Material::with('materialCurso', 'materialUser', 'aprovadoPor');
       $user = auth()->user();
        if ($user->isFormador() || $user->isAdmin()){ }
        elseif ($user->hasAcessoCursos()) {$query->where('status', 'aprovado');
        } else { return response()->json([]);}
        if ($request->has('id_curso')) {
            $query->where('id_curso', $request->id_curso);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        $materiais = $query->paginate(12);

        return response()->json([$materiais]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $user = auth()->user();
          if(!$user->isAdmin() && !$user->isFormador() && !$user->hasAcessoCursos()){
            return response()->json('Não é autorizado a dar upload de materiais', 403);
        }
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'id_curso' => 'required|exists:cursos,id',
            'ficheiro' => 'required|file|mimes:mp3,mp4,pdf,jpg,png,docx|max:51200',
        ]);
        $file = $request->file('ficheiro');
        $path = Storage::putFile('materiais', $request->file('ficheiro'), 'public');
        $validated['caminho_ficheiro'] = $path;
        $validated['formato'] = $request->file('ficheiro')->getClientOriginalExtension();
        $validated['id_user'] = $user->id;
        if ($user->isAdmin() || $user->isFormador()) {
            $validated['status'] = 'aprovado';
            $validated['aprovado_por'] = $user->id;
            $validated['data_aprovacao'] = now();
        } else {
            $validated['status'] = 'pendente';
            $validated['aprovado_por'] = null;
            $validated['data_aprovacao'] = null;
        }
        $material = Material::create($validated);
        $material->load(['materialCurso', 'materialUser', 'aprovadoPor']);
        return response()->json($material, 201);
    }

    /**
     * Display the specified resource.
     */
   public function show(Material $material)
    {
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isFormador()) {
        if (!$user->hasAcessoCursos()) {
            return response()->json('Sem acesso aos materiais', 403);
        } if ($material->status !== 'aprovado') {
            return response()->json('Material não aprovado', 403);
        }
        }
        $material->load(['materialCurso', 'materialUser', 'aprovadoPor']);
        return response()->json($material);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, Material $material)
    {
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isFormador()) {
            return response()->json('Não tens permissão para aprovar materiais', 403);
        }
        if ($user->isFormador()) {
            $cursoIds = $user->cursosLecionados()->pluck('id');
            if (!$cursoIds->contains($material->id_curso)) {
                return response()->json('Não tens permissão para aprovar materiais deste curso', 403);}
        }
        $validated = $request->validate([
            'status' => 'required|in:aprovado,rejeitado',
        ]);
        $material->update([
            'status' => $validated['status'],
            'aprovado_por' => $user->id,
            'data_aprovacao' => now(),
        ]);
        return response()->json($material);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $user = auth()->user();
        $canDelete = $user->isAdmin()
            || $material->id_user === $user->id
            || ($user->isFormador() && $material->materialCurso->formadores === $user->id);
        if (!$canDelete) {
            return response()->json('Não tens permissão para apagar este material', 403);
        }
        Storage::disk('public')->delete($material->caminho_ficheiro);
         $material->delete();
         return response()->json('Material apagado com sucesso');
    }

    public function pendentes()
    {
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isFormador()) {
            return response()->json('Não tens permissão', 403);
        }
        $query = Material::where('status', 'pendente')
            ->with(['materialCurso', 'materialUser']);
        if ($user->isFormador()) {
            $cursoIds = $user->cursosLecionados()->pluck('id');
            $query->whereIn('id_curso', $cursoIds);
        }
        $materiais = $query->get();
        return response()->json($materiais);
    }
}
