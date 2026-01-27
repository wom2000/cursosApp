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

    public function estudante()
    {
        $user = auth()->user();

        if (!$user->isEstudante()) {
            abort(403, 'Acesso negado');
        }
        $totalProgressos = $user->progressos()->count();
        $materiaisVistos = $user->progressos()->where('status', 'visto')->count();
        $cursosCompletados = $user->progressos()
            ->where('curso_completado', true)
            ->distinct('id_material')
            ->count();

        $subscricao = $user->subscricao()->where('status', 'ativa')->first();
        $hasAccess = $user->isCesaeStudent() || $subscricao !== null;
        $ultimosMateriais = $user->progressos()
            ->with(['material.materialCurso'])
            ->where('status', 'visto')
            ->latest('completado_em')
            ->take(5)
            ->get();

        $materiaisAVer = $user->progressos()
            ->where('status', 'a_ver')
            ->count();

        return Inertia::render('Dashboard/Estudante', [
            'stats' => [
                'total_progressos' => $totalProgressos,
                'materiais_vistos' => $materiaisVistos,
                'materiais_a_ver' => $materiaisAVer,
                'cursos_completados' => $cursosCompletados,
                'has_access' => $hasAccess,
                'is_cesae' => $user->isCesaeStudent(),
            ],
            'subscricao' => $subscricao,
            'ultimos_materiais' => $ultimosMateriais,
        ]);
    }

    public function formador()
    {
        $user = auth()->user();

        if (!$user->isFormador()) {
            abort(403, 'Acesso negado');
        }
        $totalCursos = $user->cursosLecionados()->count();
        $cursosIds = $user->cursosLecionados()->pluck('id');
        $totalMateriais = Material::whereIn('id_curso', $cursosIds)->count();
        $materiaisAprovados = Material::whereIn('id_curso', $cursosIds)
            ->where('status', 'aprovado')
            ->count();
        $materiaisPendentes = Material::whereIn('id_curso', $cursosIds)
            ->where('status', 'pendente')
            ->count();
        $materiaisRejeitados = Material::whereIn('id_curso', $cursosIds)
            ->where('status', 'rejeitado')
            ->count();

        $cursosRecentes = $user->cursosLecionados()
            ->withCount('materiais')
            ->with('categoria')
            ->latest()
            ->take(5)
            ->get();

        $materiaisPendentesLista = Material::whereIn('id_curso', $cursosIds)
            ->where('status', 'pendente')
            ->with(['materialCurso', 'materialUser'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Dashboard/Formador', [
            'stats' => [
                'total_cursos' => $totalCursos,
                'total_materiais' => $totalMateriais,
                'materiais_aprovados' => $materiaisAprovados,
                'materiais_pendentes' => $materiaisPendentes,
                'materiais_rejeitados' => $materiaisRejeitados,
            ],
            'cursos_recentes' => $cursosRecentes,
            'materiais_pendentes' => $materiaisPendentesLista,
        ]);
    }

    public function admin()
    {
        $user = auth()->user();

        if (!$user->isAdmin()) {
            abort(403, 'Acesso negado');
        }

        $stats = [
            'total_users' => User::count(),
            'total_estudantes' => User::where('role', User::ROLE_ESTUDANTE)->count(),
            'total_formadores' => User::where('role', User::ROLE_FORMADOR)->count(),
            'alunos_cesae' => User::where('cesae_student', true)->count(),
            'total_cursos' => Curso::count(),
            'total_materiais' => Material::count(),
            'materiais_aprovados' => Material::where('status', 'aprovado')->count(),
            'materiais_pendentes' => Material::where('status', 'pendente')->count(),
            'materiais_rejeitados' => Material::where('status', 'rejeitado')->count(),
            'subscricoes_ativas' => Subscricao::where('status', 'ativa')->count(),
            'subscricoes_expiradas' => Subscricao::where('status', 'expirada')->count(),
            'subscricoes_canceladas' => Subscricao::where('status', 'cancelada')->count(),
        ];

        $cursosPorCategoria = Curso::selectRaw('area, COUNT(*) as total')
            ->groupBy('area')
            ->with('categoria:id,nome')
            ->get();

        $materiaisPendentes = Material::where('status', 'pendente')
            ->with(['materialCurso', 'materialUser'])
            ->latest()
            ->take(10)
            ->get();

        $ultimasSubscricoes = Subscricao::with('user')
            ->latest()
            ->take(5)
            ->get();

        $ultimosUsers = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        return Inertia::render('Dashboard/Admin', [
            'stats' => $stats,
            'cursos_por_categoria' => $cursosPorCategoria,
            'materiais_pendentes' => $materiaisPendentes,
            'ultimas_subscricoes' => $ultimasSubscricoes,
            'ultimos_users' => $ultimosUsers,
        ]);
    }
}
