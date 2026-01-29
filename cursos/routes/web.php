<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomepageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
require __DIR__ . '/auth.php';


Route::get('/', [HomepageController::class, 'index'])->name('home');
    Route::get('/cursos', function () {
        return Inertia::render('Courses/AllCourses');
    })->name('cursos.index');
     Route::get('/categorias', function () {
        return Inertia::render('Categories/AllCategories');
    })->name('AllCategories');



// Rotas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboards
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/estudante', [DashboardController::class, 'estudante'])->name('dashboard.estudante');
    Route::get('/dashboard/formador', [DashboardController::class, 'formador'])->name('dashboard.formador');
    Route::get('/dashboard/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');

    // Cursos



    Route::get('/curso/{id}', function ($id) {
        return Inertia::render('Courses/ShowCourse', ['id' => $id]);
    })->name('ShowCourse');

    Route::get('/criar-curso', function () {
        return Inertia::render('Courses/CreateCourse');
    })->name('CreateCourse');

    Route::get('/editar-curso/{id}', function ($id) {
        return Inertia::render('Courses/EditCourse', ['id' => $id]);
    })->name('EditCourse');

    // Materiais
    Route::get('/conteudos', function () {
        return Inertia::render('Materials/AllMaterials');
    })->name('AllMaterials');

    Route::get('/carregar-conteudo', function () {
        return Inertia::render('Materials/UploadMaterials');
    })->name('UploadMaterials');

    Route::get('/editar-conteudo/{id}', function ($id) {
        return Inertia::render('Materials/EditMaterials', ['id' => $id]);
    })->name('EditMaterials');

    // Subscrições
    Route::get('/subscrever', function () {
        return Inertia::render('Subscriptions/CreateSubscription');
    })->name('CreateSubscription');

    Route::get('/gerir-subscricao/{id}', function ($id) {
        return Inertia::render('Subscriptions/ManageSubscription', ['id' => $id]);
    })->name('ManageSubscription');

    Route::get('/progresso', function () {
        return Inertia::render('Subscriptions/ManageSubscription');
    })->name('subscriptions.progress');

    // todas notificaçoes
    Route::get('/notificacoes', function () {
        return Inertia::render('Notifications/AllNotifications');
    })->name('notifications.index');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
