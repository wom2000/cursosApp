<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Curso::with('categoria', 'formador')->withCount('materiais');

        if($request->has('area')){
            $query->where('area', $request->area);
        }
         if($request->has('nivel')){
            $query->where('nivel', $request->nivel);
        }
         if ($request->has('search')) {
            $query->where('nome', 'like', '%' . $request->search . '%');
        }
        $cursos = $query ->paginate(12);
        return response()->json($cursos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $user = auth()->user();
         if(!$user->isAdmin() && !$user->isFormador()){
            return response()->json('Não é autorizado a criar cursos', 403);
        }
        $validated = $request->validate([
            'nome' =>'required|string|max:125|unique:cursos',
            'descricao'=>'nullable|string',
            'area'=>'required|exists:categorias,id',
            'duracao'=>'required|string',
            'nivel'=>'required|in:iniciante,intermedio,avancado',
        ]);
        if ($user->isFormador()) {
            $validated['formadores'] = $user->id;
        } else {
            $request->validate([
                'formadores' => 'required|exists:users,id']);
            $validated['formadores'] = $request->formadores;
        }

        $curso = Curso::create($validated);

        return response()->json($curso, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Curso $curso)
    {
       $user = auth()->user();

       $curso->load([
        'categoria',
        'formador', ]);
        if ($user) {
        if ($user->isAdmin() || $user->isFormador()) {
            $curso->load('materiais');
        } elseif ($user->hasAcessoCursos()) {
            $curso->load(['materiais' => function($query) {
                $query->where('status', 'aprovado');
            }]);
        }};
        return response()->json([
        'curso' => $curso,
        'tem_acesso_materiais' => $user ? ($user->isAdmin() || $user->isFormador() || $user->hasAcessoCursos()) : false,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Curso $curso)
    {
        $user = auth()->user();
         if(!$user->isAdmin() && !$user->isFormador()){
            return response()->json('Não é autorizado a atualizar cursos', 403);
        }
        $validated = $request->validate([
            'nome' =>'required|string|max:125|unique:cursos,nome,' . $curso->id,
            'descricao'=>'nullable|string',
            'area'=>'required|exists:categorias,id',
            'duracao'=>'required|string',
            'nivel'=>'required|in:iniciante,intermedio,avancado',
        ]);
        if ($user->isFormador()) {
            $validated['formadores'] = $user->id;
        } else {
            $request->validate([
                'formadores' => 'required|exists:users,id']);
            $validated['formadores'] = $request->formadores;
        }

        $curso->update($validated);

        return response()->json($curso, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Curso $curso)
    {
         $user = auth()->user();
        if(!$user->isAdmin()){
            return response()->json('Não é autorizado a eliminar cursos', 403);
            }
        $curso->delete();
            return response()->json("curso eliminado", 200);

    }
    }

