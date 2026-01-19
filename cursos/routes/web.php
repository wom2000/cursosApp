<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página inicial pública
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => [
            'user' => auth()->user(), // ← Adiciona isto
        ],
        'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Rotas de autenticação (Breeze)
require __DIR__.'/auth.php';

// Rotas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard unificado (redireciona baseado no role)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Dashboards específicos por role
    Route::get('/dashboard/estudante', [DashboardController::class, 'estudante'])->name('dashboard.estudante');
    Route::get('/dashboard/formador', [DashboardController::class, 'formador'])->name('dashboard.formador');
    Route::get('/dashboard/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');

    // Profile (Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
