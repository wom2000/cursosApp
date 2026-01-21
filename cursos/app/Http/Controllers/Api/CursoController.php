<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    // Listar todos os cursos (com filtros opcionais)
    public function index(Request $request)
    {
        $query = Curso::with(['categoria', 'formador'])
            ->withCount('materiais');

        // Filtro por categoria
        if ($request->has('area')) {
            $query->where('area', $request->area);
        }

        // Filtro por nível
        if ($request->has('nivel')) {
            $query->where('nivel', $request->nivel);
        }

        // Busca por nome
        if ($request->has('search')) {
            $query->where('nome', 'like', '%' . $request->search . '%');
        }

        $cursos = $query->paginate(12);

        return response()->json([
            'success' => true,
            'data' => $cursos
        ]);
    }

    // Criar novo curso (formador/admin)
    public function store(Request $request)
    {
        $user = auth()->user();

        // Verificar permissões
        if (!$user->isAdmin() && !$user->isFormador()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para criar cursos'
            ], 403);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'area' => 'required|exists:categorias,id',
            'duracao' => 'required|string',
            'descricao' => 'required|string',
            'nivel' => 'required|in:iniciante,intermedio,avancado',
        ]);

        // Formador só pode criar cursos para si próprio
        $validated['formadores'] = $user->isFormador() ? $user->id : $request->formadores;

        $curso = Curso::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Curso criado com sucesso',
            'data' => $curso->load(['categoria', 'formador'])
        ], 201);
    }

    // Ver detalhes de um curso
   public function show(Curso $curso)
{
    $user = auth()->user();

    $curso->load([
        'categoria',
        'formador',
        'materiais' => function($query) use ($user) {
            // Se não estiver autenticado OU for estudante, mostra só aprovados
            if (!$user || $user->isEstudante()) {
                $query->where('status', 'aprovado');
            }
            // Admin e Formador veem tudo (incluindo pendentes)
        }
    ]);

    // Verificar acesso (só se estiver autenticado)
    $hasAccess = false;
    if ($user) {
        $hasAccess = $user->isCesaeStudent() ||
                     $user->subscricaoAtiva()->exists() ||
                     $user->isAdmin() ||
                     $user->isFormador();
    }

    return response()->json([
        'success' => true,
        'data' => $curso,
        'has_access' => $hasAccess, // false se não estiver autenticado
        'can_view_content' => $hasAccess // deixa claro se pode ver conteúdos
    ]);
}

    // Atualizar curso (formador do curso ou admin)
    public function update(Request $request, Curso $curso)
    {
        $user = auth()->user();

        // Verificar permissões
        if (!$user->isAdmin() && $curso->formadores !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para editar este curso'
            ], 403);
        }

        $validated = $request->validate([
            'nome' => 'sometimes|string|max:255',
            'area' => 'sometimes|exists:categorias,id',
            'duracao' => 'sometimes|string',
            'descricao' => 'sometimes|string',
            'nivel' => 'sometimes|in:iniciante,intermedio,avancado',
        ]);

        $curso->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Curso atualizado com sucesso',
            'data' => $curso->load(['categoria', 'formador'])
        ]);
    }

    // Apagar curso (formador do curso ou admin)
    public function destroy(Curso $curso)
    {
        $user = auth()->user();

        if (!$user->isAdmin() && $curso->formadores !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para apagar este curso'
            ], 403);
        }

        $curso->delete();

        return response()->json([
            'success' => true,
            'message' => 'Curso apagado com sucesso'
        ]);
    }

    // Cursos do formador logado
    public function meusCursos()
    {
        $user = auth()->user();

        if (!$user->isFormador() && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Apenas formadores podem aceder a esta funcionalidade'
            ], 403);
        }

        $cursos = Curso::where('formadores', $user->id)
            ->with(['categoria', 'materiais'])
            ->withCount('materiais')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $cursos
        ]);
    }
}
