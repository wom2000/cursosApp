<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\ProgressoController;
use App\Http\Controllers\Api\SubscricaoController;

// Ping
Route::get('/ping', function () {
    return response()->json(['message' => 'API funcionando!', 'timestamp' => now()]);
});

// Auth - Públicas
Route::post('/auth/login', [ApiAuthController::class, 'login'])->name('auth.login');
Route::post('/auth/register', [ApiAuthController::class, 'register'])->name('auth.register');

// Auth - Protegidas
Route::post('/auth/logout', [ApiAuthController::class, 'logout'])->name('auth.logout')->middleware('auth:sanctum');
Route::get('/auth/me', [ApiAuthController::class, 'me'])->name('auth.me')->middleware('auth:sanctum');

// User
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Categorias
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::post('/categorias-criar', [CategoriaController::class, 'store'])->name('categorias.store')->middleware('auth:sanctum');
Route::get('/categorias/{categoria}', [CategoriaController::class, 'show'])->name('categorias.show')->middleware('auth:sanctum');
Route::put('/categorias/{categoria}', [CategoriaController::class, 'update'])->name('categorias.update')->middleware('auth:sanctum');
Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy')->middleware('auth:sanctum');

// Cursos
Route::get('/cursos-publicos', [CursoController::class, 'index'])->name('cursos.public');
Route::get('/cursos', [CursoController::class, 'index'])->name('AllCourses');
Route::post('/cursos-criar', [CursoController::class, 'store'])->name('cursos.store')->middleware('auth:sanctum');
Route::get('/cursos/{curso}', [CursoController::class, 'show'])->name('cursos.show')->middleware('auth:sanctum');
Route::put('/cursos/{curso}', [CursoController::class, 'update'])->name('cursos.update')->middleware('auth:sanctum');
Route::delete('/cursos/{curso}', [CursoController::class, 'destroy'])->name('cursos.destroy')->middleware('auth:sanctum');

// Materiais
Route::get('/materiais', [MaterialController::class, 'index'])->name('api.materiais.index')->middleware('auth:sanctum');
Route::post('/materiais-criar', [MaterialController::class, 'store'])->name('materiais.store')->middleware('auth:sanctum');
Route::get('/materiais/pendentes', [MaterialController::class, 'pendentes'])->name('materiais.pendentes')->middleware('auth:sanctum');
Route::get('/materiais/{material}', [MaterialController::class, 'show'])->name('materiais.show')->middleware('auth:sanctum');
Route::patch('/materiais/{material}/status', [MaterialController::class, 'updateStatus'])->name('materiais.updateStatus')->middleware('auth:sanctum');
Route::delete('/materiais/{material}', [MaterialController::class, 'destroy'])->name('materiais.destroy')->middleware('auth:sanctum');

// Progressos
Route::get('/progressos', [ProgressoController::class, 'index'])->name('progressos.index')->middleware('auth:sanctum');
Route::post('/progressos-criar', [ProgressoController::class, 'store'])->name('progressos.store')->middleware('auth:sanctum');
Route::get('/progressos/cursos-completados', [ProgressoController::class, 'cursosCompletados'])->name('progressos.cursosCompletados')->middleware('auth:sanctum');
Route::get('/progressos/{progresso}', [ProgressoController::class, 'show'])->name('progressos.show')->middleware('auth:sanctum');
Route::put('/progressos/{progresso}', [ProgressoController::class, 'update'])->name('progressos.update')->middleware('auth:sanctum');
Route::delete('/progressos/{progresso}', [ProgressoController::class, 'destroy'])->name('progressos.destroy')->middleware('auth:sanctum');

// Subscrições
Route::get('/subscricoes', [SubscricaoController::class, 'index'])->name('subscricoes.index')->middleware('auth:sanctum');
Route::post('/subscricoes-criar', [SubscricaoController::class, 'store'])->name('subscricoes.store')->middleware('auth:sanctum');
Route::get('/subscricoes/todas', [SubscricaoController::class, 'todas'])->name('subscricoes.todas')->middleware('auth:sanctum');
Route::get('/subscricoes/{subscricao}', [SubscricaoController::class, 'show'])->name('subscricoes.show')->middleware('auth:sanctum');
Route::put('/subscricoes/{subscricao}', [SubscricaoController::class, 'update'])->name('subscricoes.update')->middleware('auth:sanctum');
Route::patch('/subscricoes/{subscricao}/cancelar', [SubscricaoController::class, 'cancelar'])->name('subscricoes.cancelar')->middleware('auth:sanctum');
Route::post('/subscricoes/{subscricao}/renovar', [SubscricaoController::class, 'renovar'])->name('subscricoes.renovar')->middleware('auth:sanctum');
