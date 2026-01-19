<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    // Listar materiais (com filtros)
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Material::with(['curso', 'user', 'aprovadoPor']);

        // Admin vê tudo
        // Formador vê materiais dos seus cursos
        // Estudante vê apenas materiais aprovados
        if ($user->isEstudante()) {
            $query->where('status', 'aprovado');
        } elseif ($user->isFormador()) {
            $cursoIds = $user->cursosLecionados()->pluck('id');
            $query->whereIn('id_curso', $cursoIds);
        }

        // Filtro por curso
        if ($request->has('curso_id')) {
            $query->where('id_curso', $request->curso_id);
        }

        // Filtro por status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $materiais = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $materiais
        ]);
    }

    // Upload de material
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'id_curso' => 'required|exists:cursos,id',
            'ficheiro' => 'required|file|mimes:mp3,mp4,pdf,jpg,png,docx|max:51200', // 50MB
        ]);

        // Upload do ficheiro
        $path = $request->file('ficheiro')->store('materiais', 'public');
        $formato = $request->file('ficheiro')->getClientOriginalExtension();

        $material = Material::create([
            'nome' => $validated['nome'],
            'id_user' => auth()->id(),
            'id_curso' => $validated['id_curso'],
            'caminho_ficheiro' => $path,
            'formato' => $formato,
            'status' => 'pendente', // Precisa aprovação
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Material enviado com sucesso. Aguarda aprovação.',
            'data' => $material->load(['curso', 'user'])
        ], 201);
    }

    // Ver material específico
    public function show(Material $material)
    {
        $user = auth()->user();

        // Verificar se tem acesso
        if ($material->status !== 'aprovado' &&
            !$user->isAdmin() &&
            !$user->isFormador() &&
            $material->id_user !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Material ainda não foi aprovado'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $material->load(['curso', 'user', 'aprovadoPor'])
        ]);
    }

    // Aprovar/Rejeitar material (admin/formador)
    public function updateStatus(Request $request, Material $material)
    {
        $user = auth()->user();

        // Verificar permissões
        if (!$user->isAdmin() && !$user->isFormador()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para aprovar materiais'
            ], 403);
        }

        // Formador só pode aprovar materiais dos seus cursos
        if ($user->isFormador()) {
            $cursoIds = $user->cursosLecionados()->pluck('id');
            if (!$cursoIds->contains($material->id_curso)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Não tens permissão para aprovar materiais deste curso'
                ], 403);
            }
        }

        $validated = $request->validate([
            'status' => 'required|in:aprovado,rejeitado',
        ]);

        $material->update([
            'status' => $validated['status'],
            'aprovado_por' => $user->id,
            'data_aprovacao' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Material ' . $validated['status'] . ' com sucesso',
            'data' => $material->load(['aprovadoPor'])
        ]);
    }

    // Apagar material
    public function destroy(Material $material)
    {
        $user = auth()->user();

        // Apenas admin, formador do curso ou owner podem apagar
        $canDelete = $user->isAdmin() ||
                     $material->id_user === $user->id ||
                     ($user->isFormador() && $material->curso->formadores === $user->id);

        if (!$canDelete) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para apagar este material'
            ], 403);
        }

        // Apagar ficheiro
        Storage::disk('public')->delete($material->caminho_ficheiro);

        $material->delete();

        return response()->json([
            'success' => true,
            'message' => 'Material apagado com sucesso'
        ]);
    }

    // Materiais pendentes (admin/formador)
    public function pendentes()
    {
        $user = auth()->user();

        if (!$user->isAdmin() && !$user->isFormador()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão'
            ], 403);
        }

        $query = Material::where('status', 'pendente')
            ->with(['curso', 'user']);

        // Formador vê apenas dos seus cursos
        if ($user->isFormador()) {
            $cursoIds = $user->cursosLecionados()->pluck('id');
            $query->whereIn('id_curso', $cursoIds);
        }

        $materiais = $query->get();

        return response()->json([
            'success' => true,
            'data' => $materiais
        ]);
    }
}
