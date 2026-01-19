<?php

use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\SubscricaoController;
use App\Http\Controllers\Api\ProgressoCursoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rota para obter user autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rotas públicas (sem autenticação)
Route::prefix('v1')->group(function () {

    // Categorias (públicas - listar)
    Route::get('/categorias', [CategoriaController::class, 'index']);
    Route::get('/categorias/{categoria}', [CategoriaController::class, 'show']);

    // Cursos (públicos - listar e ver detalhes)
    Route::get('/cursos', [CursoController::class, 'index']);
    Route::get('/cursos/{curso}', [CursoController::class, 'show']);
});

// Rotas autenticadas
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {

    // ============================================
    // CATEGORIAS
    // ============================================
    Route::prefix('categorias')->group(function () {
        Route::post('/', [CategoriaController::class, 'store']); // Criar (admin)
        Route::put('/{categoria}', [CategoriaController::class, 'update']); // Editar (admin)
        Route::delete('/{categoria}', [CategoriaController::class, 'destroy']); // Apagar (admin)
    });

    // ============================================
    // CURSOS
    // ============================================
    Route::prefix('cursos')->group(function () {
        Route::post('/', [CursoController::class, 'store']); // Criar curso
        Route::put('/{curso}', [CursoController::class, 'update']); // Editar curso
        Route::delete('/{curso}', [CursoController::class, 'destroy']); // Apagar curso
        Route::get('/meus-cursos', [CursoController::class, 'meusCursos']); // Cursos do formador
    });

    // ============================================
    // MATERIAIS
    // ============================================
    Route::prefix('materiais')->group(function () {
        Route::get('/', [MaterialController::class, 'index']); // Listar materiais
        Route::post('/', [MaterialController::class, 'store']); // Upload material
        Route::get('/pendentes', [MaterialController::class, 'pendentes']); // Materiais pendentes
        Route::get('/{material}', [MaterialController::class, 'show']); // Ver material
        Route::post('/{material}/status', [MaterialController::class, 'updateStatus']); // Aprovar/Rejeitar
        Route::delete('/{material}', [MaterialController::class, 'destroy']); // Apagar material
    });

    // ============================================
    // SUBSCRIÇÕES
    // ============================================
    Route::prefix('subscricoes')->group(function () {
        Route::get('/', [SubscricaoController::class, 'index']); // Minhas subscrições
        Route::post('/', [SubscricaoController::class, 'store']); // Criar subscrição
        Route::get('/verificar-acesso', [SubscricaoController::class, 'verificarAcesso']); // Verificar acesso
        Route::get('/todas', [SubscricaoController::class, 'todas']); // Todas (admin)
        Route::get('/{subscricao}', [SubscricaoController::class, 'show']); // Ver subscrição
        Route::put('/{subscricao}', [SubscricaoController::class, 'update']); // Atualizar (admin)
        Route::post('/{subscricao}/cancelar', [SubscricaoController::class, 'cancelar']); // Cancelar
        Route::post('/{subscricao}/renovar', [SubscricaoController::class, 'renovar']); // Renovar
    });

    // ============================================
    // PROGRESSO
    // ============================================
    Route::prefix('progresso')->group(function () {
        Route::get('/', [ProgressoCursoController::class, 'index']); // Meu progresso
        Route::post('/', [ProgressoCursoController::class, 'store']); // Registar progresso
        Route::get('/curso/{curso}', [ProgressoCursoController::class, 'progressoCurso']); // Progresso de um curso
        Route::post('/curso/{curso}/resetar', [ProgressoCursoController::class, 'resetarCurso']); // Resetar curso
        Route::get('/{progressoCurso}', [ProgressoCursoController::class, 'show']); // Ver progresso
        Route::put('/{progressoCurso}', [ProgressoCursoController::class, 'update']); // Atualizar progresso
        Route::delete('/{progressoCurso}', [ProgressoCursoController::class, 'destroy']); // Apagar progresso
    });
});
