<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    // Listar todas as categorias
    public function index()
    {
        $categorias = Categoria::withCount('cursos')->get();

        return response()->json([
            'success' => true,
            'data' => $categorias
        ]);
    }

    // Criar nova categoria (admin apenas)
    public function store(Request $request)
    {
        // Verificar se é admin
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para criar categorias'
            ], 403);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:categorias',
            'descricao' => 'nullable|string',
        ]);

        $categoria = Categoria::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Categoria criada com sucesso',
            'data' => $categoria
        ], 201);
    }

    // Ver uma categoria específica
    public function show(Categoria $categoria)
    {
        $categoria->load('cursos');

        return response()->json([
            'success' => true,
            'data' => $categoria
        ]);
    }

    // Atualizar categoria (admin apenas)
    public function update(Request $request, Categoria $categoria)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para editar categorias'
            ], 403);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:categorias,nome,' . $categoria->id,
            'descricao' => 'nullable|string',
        ]);

        $categoria->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Categoria atualizada com sucesso',
            'data' => $categoria
        ]);
    }

    // Apagar categoria (admin apenas)
    public function destroy(Categoria $categoria)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para apagar categorias'
            ], 403);
        }

        // Verificar se tem cursos associados
        if ($categoria->cursos()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Não podes apagar uma categoria com cursos associados'
            ], 400);
        }

        $categoria->delete();

        return response()->json([
            'success' => true,
            'message' => 'Categoria apagada com sucesso'
        ]);
    }
}
