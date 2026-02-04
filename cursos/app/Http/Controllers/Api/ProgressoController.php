<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Curso;
use App\Models\Material;
use App\Models\Progresso;
use Illuminate\Http\Request;

class ProgressoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $user = auth()->user();
        $progressos = $user->progressos()
            ->with(['material.materialCurso', 'material'])
            ->orderBy('updated_at', 'desc')
            ->get();
            return response()->json($progressos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $user = auth()->user();
    if ($user->isAdmin() || $user->isFormador()) {
        return response()->json('Não tens permissão para atualizar progresso', 403);
    }

    $validated = $request->validate([
        'id_material' => 'required|exists:materiais,id',
        'status' => 'required|in:para_ver,a_ver,visto',
    ]);
    $material = Material::where('id', $validated['id_material'])
        ->where('status', 'aprovado')
        ->first();

    if (!$material) {
        return response()->json('Material não encontrado ou não aprovado', 404);
    }
    if ($material->conta_progresso === false) {
        return response()->json('Material de suporte não conta para progresso', 403);
    }
    if (!$user->hasAcessoCursos()) {
        return response()->json('Sem acesso aos cursos', 403);
    }
    $progresso = Progresso::updateOrCreate(
        [
            'id_user' => $user->id,
            'id_material' => $validated['id_material'],
        ],
        [
            'status' => $validated['status'],
            'completado_em' => $validated['status'] === 'visto' ? now() : null,
        ]
    );
    $cursoCompletado = $this->verificarConclusaoCurso($user, $material->id_curso);
    return response()->json([
        'message' => 'Progresso atualizado',
        'progresso' => $progresso,
        'curso_completado' => $cursoCompletado,
    ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Progresso $progresso)
    {
        $user = auth()->user();
        if ($progresso->id_user !== $user->id && !$user->isAdmin()) {
            return response()->json('Não tens permissão', 403);
        }
        $progresso->load(['material.materialCurso']);
        return response()->json($progresso);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Progresso $progresso)
    {
        $user = auth()->user();
        if ($user->isAdmin() || $user->isFormador()) {
            return response()->json('Não tens permissão para atualizar progresso', 403);
        }
        if ($progresso->id_user !== $user->id) {
            return response()->json('Não tens permissão', 403);
        }
        $validated = $request->validate([
            'status' => 'required|in:para_ver,a_ver,visto',
        ]);

        if ($progresso->material && $progresso->material->conta_progresso === false) {
            return response()->json('Material de suporte não conta para progresso', 403);
        }

        $progresso->update([
            'status' => $validated['status'],
            'completado_em' => $validated['status'] === 'visto' ? now() : null,
        ]);
        $material = $progresso->material;
        $cursoCompletado = $this->verificarConclusaoCurso($user, $material->id_curso);

        return response()->json([
            'message' => 'Progresso atualizado',
            'progresso' => $progresso->load('material'),
            'curso_completado' => $cursoCompletado,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Progresso $progresso)
    {
        $user = auth()->user();
        if ($progresso->id_user !== $user->id && !$user->isAdmin()) {
            return response()->json('Não tens permissão', 403);
        }
        $progresso->delete();
        return response()->json(['Progresso removido']);
    }


    private function verificarConclusaoCurso($user, $cursoId)
    {
        $materiaisAprovados = Material::where('id_curso', $cursoId)
            ->where('status', 'aprovado')
            ->where('conta_progresso', true)
            ->pluck('id');

        $totalMateriais = $materiaisAprovados->count();

        if ($totalMateriais === 0) {
            return false;
        }

        $materiaisVistos = Progresso::where('id_user', $user->id)
            ->whereIn('id_material', $materiaisAprovados)
            ->where('status', 'visto')
            ->count();

        if ($materiaisVistos === $totalMateriais) {
            Progresso::where('id_user', $user->id)
                ->whereIn('id_material', $materiaisAprovados)
                ->update([
                    'curso_completado' => true,
                    'curso_completado_em' => now(),
                ]);

            return true;
        }

        return false;
    }

    public function cursosCompletados()
    {
        $user = auth()->user();

        $cursosCompletadosIds = Progresso::where('id_user', $user->id)
            ->where('curso_completado', true)
            ->with('material')
            ->get()
            ->pluck('material.id_curso')
            ->unique();

        $cursos = Curso::whereIn('id', $cursosCompletadosIds)
            ->with('categoria')
            ->get()
            ->map(function($curso) use ($user) {
                $conclusao = Progresso::where('id_user', $user->id)
                    ->whereHas('material', function($query) use ($curso) {
                        $query->where('id_curso', $curso->id);
                    })
                    ->where('curso_completado', true)
                    ->first();

                return [
                    'curso' => $curso,
                    'completado_em' => $conclusao->curso_completado_em ?? null,
                ];
            });

        return response()->json($cursos);
    }
}

// Resumo: Guarda e consulta o progresso dos alunos por material e calcula e cursos concluidos (apenas materiais que contam para progresso).
