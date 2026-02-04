<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Curso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $categorias = Categoria::withCount('cursos')
            ->orderBy('nome', 'asc')
            ->get();
            //dd($categorias->toArray());
        $cursosDestaque = Curso::with(['categoria', 'formador'])
            ->withCount('materiais')
            ->latest()
            ->take(6)
            ->get();

        $data = [
            'categorias' => $categorias,
            'cursosDestaque' => $cursosDestaque,
        ];

        if ($user) {
            $data['stats'] = [
                'total_cursos' => Curso::count(),
                'materiais_vistos' => $user->progressos()->where('status', 'visto')->count(),
                'materiais_a_ver' => $user->progressos()->where('status', 'a_ver')->count(),
                'cursos_completados' => $user->progressos()
                    ->where('curso_completado', true)
                    ->distinct('id_material')
                    ->count(),
            ];
        }

        return Inertia::render('Homepage', $data);
    }
}

// Resumo: Controla a homepage e envia dados iniciais para a vista.
