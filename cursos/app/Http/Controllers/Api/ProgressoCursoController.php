<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgressoCurso;
use App\Models\Material;
use App\Models\Curso;
use Illuminate\Http\Request;

class ProgressoCursoController extends Controller
{
    // Listar progresso do utilizador
    public function index()
    {
        $user = auth()->user();

        $progressos = $user->progressos()
            ->with(['material.curso', 'material'])
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $progressos
        ]);
    }

    // Registar/atualizar progresso de um material
    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'id_material' => 'required|exists:materiais,id',
            'status' => 'required|in:para_ver,a_ver,visto',
        ]);

        // Verificar se o material existe e está aprovado
        $material = Material::where('id', $validated['id_material'])
            ->where('status', 'aprovado')
            ->first();

        if (!$material) {
            return response()->json([
                'success' => false,
                'message' => 'Material não encontrado ou não aprovado'
            ], 404);
        }

        // Verificar se o user tem acesso ao curso
        if (!$user->isCesaeStudent() && !$user->subscricaoAtiva()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Precisas de uma subscrição ativa para aceder aos cursos'
            ], 403);
        }

        // Criar ou atualizar progresso
        $progresso = ProgressoCurso::updateOrCreate(
            [
                'id_user' => $user->id,
                'id_material' => $validated['id_material'],
            ],
            [
                'status' => $validated['status'],
                'completado_em' => $validated['status'] === 'visto' ? now() : null,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Progresso atualizado com sucesso',
            'data' => $progresso->load('material')
        ]);
    }

    // Ver progresso específico
    public function show(ProgressoCurso $progressoCurso)
    {
        $user = auth()->user();

        if ($progressoCurso->id_user !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $progressoCurso->load(['material.curso'])
        ]);
    }

    // Atualizar progresso
    public function update(Request $request, ProgressoCurso $progressoCurso)
    {
        $user = auth()->user();

        if ($progressoCurso->id_user !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão'
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:para_ver,a_ver,visto',
        ]);

        $progressoCurso->update([
            'status' => $validated['status'],
            'completado_em' => $validated['status'] === 'visto' ? now() : null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Progresso atualizado',
            'data' => $progressoCurso
        ]);
    }

    // Apagar progresso
    public function destroy(ProgressoCurso $progressoCurso)
    {
        $user = auth()->user();

        if ($progressoCurso->id_user !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão'
            ], 403);
        }

        $progressoCurso->delete();

        return response()->json([
            'success' => true,
            'message' => 'Progresso removido'
        ]);
    }

    // Progresso geral de um curso
    public function progressoCurso(Curso $curso)
    {
        $user = auth()->user();

        // Verificar acesso
        if (!$user->isCesaeStudent() && !$user->subscricaoAtiva()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Sem acesso ao curso'
            ], 403);
        }

        // Buscar todos os materiais aprovados do curso
        $materiaisAprovados = $curso->materiais()
            ->where('status', 'aprovado')
            ->pluck('id');

        $totalMateriais = $materiaisAprovados->count();

        if ($totalMateriais === 0) {
            return response()->json([
                'success' => true,
                'data' => [
                    'curso_id' => $curso->id,
                    'curso_nome' => $curso->nome,
                    'total_materiais' => 0,
                    'materiais_vistos' => 0,
                    'percentagem' => 0,
                    'progresso' => []
                ]
            ]);
        }

        // Buscar progresso do user neste curso
        $progressos = ProgressoCurso::where('id_user', $user->id)
            ->whereIn('id_material', $materiaisAprovados)
            ->with('material')
            ->get();

        $materiaisVistos = $progressos->where('status', 'visto')->count();
        $percentagem = ($materiaisVistos / $totalMateriais) * 100;

        return response()->json([
            'success' => true,
            'data' => [
                'curso_id' => $curso->id,
                'curso_nome' => $curso->nome,
                'total_materiais' => $totalMateriais,
                'materiais_vistos' => $materiaisVistos,
                'materiais_a_ver' => $progressos->where('status', 'a_ver')->count(),
                'percentagem' => round($percentagem, 2),
                'progresso' => $progressos
            ]
        ]);
    }

    // Resetar progresso de um curso
    public function resetarCurso(Curso $curso)
    {
        $user = auth()->user();

        $materiaisIds = $curso->materiais()->pluck('id');

        ProgressoCurso::where('id_user', $user->id)
            ->whereIn('id_material', $materiaisIds)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Progresso do curso resetado'
        ]);
    }
}
