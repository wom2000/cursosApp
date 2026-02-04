
<?php

use Inertia\Inertia;
use App\Models\Curso;
use App\Models\Material;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\CategoriaController;

require __DIR__.'/auth.php';

Route::get('/', [HomepageController::class, 'index'])->name('home');
Route::get('/cursos', function () {
    return Inertia::render('Courses/AllCourses', ['categorias' => Categoria::all()]);
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

    // formador
    Route::get('/dashboard/formador/cursos', function () {
        return Inertia::render('Courses/AllCourses');
    })->name('formador.courses');
    
    Route::get('/dashboard/formador/aprovar-materiais', function () {
        return Inertia::render('Materials/AllMaterials');
    })->name('formador.approve-materials');

    // Cursos
    Route::get('/curso/{id}', function ($id) {
        return Inertia::render('Courses/ShowCourse', ['id' => $id]);
    })->name('ShowCourse');
     Route::get('/api-web/cursos', [CursoController::class, 'index'])->name('cursos.list');

    Route::get('/criar-curso', function () {
        return Inertia::render('Courses/CreateCourse', ['categorias' => Categoria::all()]);
    })->name('CreateCourse')->middleware('can:criar-cursos');
    Route::post('/cursos', [CursoController::class, 'store'])->name('cursos.store');

    Route::get('/editar-curso/{id?}', function ($id = null) {
        return Inertia::render('Courses/EditCourse', ['id' => $id]);
    })->name('EditCourse');

    Route::get('/categorias/criar', function () {
        return Inertia::render('Categories/CreateCategory');
    })->name('CreateCategory');

    // Materiais
    Route::get('/conteudos', function () {
        return Inertia::render('Materials/AllMaterials');
    })->name('AllMaterials');

    Route::get('/carregar-conteudo', function () {
        return Inertia::render('Materials/UploadMaterials');
    })->name('UploadMaterials');
    Route::post('/carregar-conteudo', [MaterialController::class, 'store'])->name('materiais.store');


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

    Route::get('/subscricoes', function () {
        return Inertia::render('Subscriptions/AllSubscriptions');
    })->name('AllSubscriptions');

    Route::get('/utilizadores', function () {
        return Inertia::render('Users/AllUsers');
    })->name('AllUsers');

    // todas notificaçoes
    Route::get('/notificacoes', function () {
        return Inertia::render('Notifications/AllNotifications', [
            'auth' => Auth::user(),
            'notifications' => Auth::user()->notifications ?? [],
        ]);
    })->name('notifications.index');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

    Route::get('/admin/users', function () {
        return Inertia::render('UsersAdmin');
    })->name('admin.users')->middleware(['auth', 'verified']);
        Route::get('/editar-categoria', function () {
        return Inertia::render('Categories/EditCategory');
    })->name('EditCategory')->middleware(['auth', 'verified']);
