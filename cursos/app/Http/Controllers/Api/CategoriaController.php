<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::withCount('cursos')->get();
        return response()->json($categorias);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->isAdmin()) {
            return response()->json('Não é autorizado a criar categorias', 403);
        }
        $categoria = Categoria::create($request->validate([
            'nome' => 'required|string|max:125|unique:categorias',
            'descricao' => 'nullable|string',
        ]));
        return redirect()->route('AllCategories')->with('success', 'Categoria criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        $categoria->load('cursos');
        return response()->json($categoria);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        $user = auth()->user();
        if (!$user->isAdmin()) {
            return response()->json('Não é autorizado a editar categorias', 403);
        }
        $categoria->update($request->validate([
            'nome' => 'required|string|max:125|unique:categorias,nome,' . $categoria->id,
            'descricao' => 'nullable|string',
        ]));
        return response()->json($categoria, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        $user = auth()->user();
        if (!$user->isAdmin()) {
            return response()->json('Não é autorizado a eliminar categorias', 403);
        }
        $categoria->delete();
        return response()->json("categoria eliminada", 200);
    }
}
