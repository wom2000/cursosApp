<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Material;
use App\Models\Subscricao;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Dashboard redireciona baseado no role
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return redirect()->route('dashboard.admin');
        } elseif ($user->isFormador()) {
            return redirect()->route('dashboard.formador');
        } else {
            return redirect()->route('dashboard.estudante');
        }
    }

    // Dashboard do Estudante
    public function estudante()
    {
        $user = auth()->user();

        if (!$user->isEstudante()) {
            abort(403, 'Acesso negado');
        }

        // Progresso geral
        $totalProgressos = $user->progressos()->count();
        $materiaisVistos = $user->progressos()->where('status', 'visto')->count();

        // Subscrição
        $subscricao = $user->subscricaoAtiva;
        $hasAccess = $user->isCesaeStudent() || $subscricao !== null;

        // Últimos materiais vistos
        $ultimosMateriais = $user->progressos()
            ->with('material.curso')
            ->where('status', 'visto')
            ->latest('completado_em')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Estudante', [
            'stats' => [
                'total_progressos' => $totalProgressos,
                'materiais_vistos' => $materiaisVistos,
                'has_access' => $hasAccess,
                'is_cesae' => $user->isCesaeStudent(),
            ],
            'subscricao' => $subscricao,
            'ultimos_materiais' => $ultimosMateriais,
        ]);
    }

    // Dashboard do Formador
    public function formador()
    {
        $user = auth()->user();

        if (!$user->isFormador()) {
            abort(403, 'Acesso negado');
        }

        // Estatísticas dos cursos
        $totalCursos = $user->cursosLecionados()->count();
        $cursosIds = $user->cursosLecionados()->pluck('id');

        // Materiais dos cursos
        $totalMateriais = Material::whereIn('id_curso', $cursosIds)->count();
        $materiaisPendentes = Material::whereIn('id_curso', $cursosIds)
            ->where('status', 'pendente')
            ->count();

        // Cursos recentes
        $cursosRecentes = $user->cursosLecionados()
            ->withCount('materiais')
            ->latest()
            ->take(5)
            ->get();

        // Materiais pendentes de aprovação
        $materiaisPendentesLista = Material::whereIn('id_curso', $cursosIds)
            ->where('status', 'pendente')
            ->with(['curso', 'user'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Dashboard/Formador', [
            'stats' => [
                'total_cursos' => $totalCursos,
                'total_materiais' => $totalMateriais,
                'materiais_pendentes' => $materiaisPendentes,
            ],
            'cursos_recentes' => $cursosRecentes,
            'materiais_pendentes' => $materiaisPendentesLista,
        ]);
    }

    // Dashboard do Admin
    public function admin()
    {
        $user = auth()->user();

        if (!$user->isAdmin()) {
            abort(403, 'Acesso negado');
        }

        // Estatísticas gerais
        $stats = [
            'total_users' => User::count(),
            'total_estudantes' => User::where('role', User::ROLE_ESTUDANTE)->count(),
            'total_formadores' => User::where('role', User::ROLE_FORMADOR)->count(),
            'alunos_cesae' => User::where('cesae_student', true)->count(),
            'total_cursos' => Curso::count(),
            'total_materiais' => Material::count(),
            'materiais_pendentes' => Material::where('status', 'pendente')->count(),
            'subscricoes_ativas' => Subscricao::where('status', 'ativa')->count(),
            'subscricoes_expiradas' => Subscricao::where('status', 'expirada')->count(),
        ];

        // Cursos por categoria
        $cursosPorCategoria = Curso::selectRaw('area, COUNT(*) as total')
            ->groupBy('area')
            ->with('categoria:id,nome')
            ->get();

        // Materiais pendentes
        $materiaisPendentes = Material::where('status', 'pendente')
            ->with(['curso', 'user'])
            ->latest()
            ->take(10)
            ->get();

        // Últimas subscrições
        $ultimasSubscricoes = Subscricao::with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Admin', [
            'stats' => $stats,
            'cursos_por_categoria' => $cursosPorCategoria,
            'materiais_pendentes' => $materiaisPendentes,
            'ultimas_subscricoes' => $ultimasSubscricoes,
        ]);
    }
}
