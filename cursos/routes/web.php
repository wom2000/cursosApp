<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página inicial pública
Route::get('/', function () {
    return Inertia::render('Homepage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
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
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin-dashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified'])->name('AdminDashboard');

Route::get('/cursos', function () {
    return Inertia::render('Courses/AllCourses');
})->name('AllCourses');

Route::get('/curso', function () {
    return Inertia::render('Courses/ShowCourse');
})->name('ShowCourse');

Route::get('/criar-curso', function () {
    return Inertia::render('Courses/CreateCourse');
})->name('CreateCourse');

Route::get('/editar-curso', function () {
    return Inertia::render('Courses/EditCourse');
})->name('EditCourse');

Route::get('/conteudos', function () {
    return Inertia::render('Materials/AllMaterials');
})->name('AllMaterials');

Route::get('/carregar-conteudo', function () {
    return Inertia::render('Materials/UploadMaterials');
})->name('UploadMaterials');

Route::get('/editar-conteudo', function () {
    return Inertia::render('Materials/EditMaterials');
})->name('EditMaterials');

Route::get('/subscrever', function () {
    return Inertia::render('Subscription/CreateSubscription');
})->name('CreateSubscription');

Route::get('/gerir-subscricao', function () {
    return Inertia::render('Subscription/ManageSubscription');
})->name('ManageSubscription');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
