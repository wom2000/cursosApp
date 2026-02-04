<?php
use Inertia\Inertia;
use App\Models\Categoria;
use App\Models\Curso;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\ProgressoController;

require __DIR__ . '/auth.php';


Route::get('/', [HomepageController::class, 'index'])->name('home');
Route::get('/cursos', function () {
    return Inertia::render('Courses/AllCourses', ['categorias' => Categoria::all()]);
})->name('cursos.index');
Route::get('/categorias', function () {
    return Inertia::render('Categories/AllCategories');
})->name('AllCategories');

Route::get('/criar-categoria', function () {
    return Inertia::render('Categories/CreateCategory');
})->name('CreateCategory')->middleware(['auth', 'verified', 'can:criar-categorias']);
Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');

Route::get('/editar-categoria/{id?}', function ($id = null) {
    return Inertia::render('Categories/EditCategory', ['id' => $id]);
})->name('EditCategory')->middleware(['auth', 'verified']);

// Rotas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboards
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/estudante', [DashboardController::class, 'estudante'])->name('dashboard.estudante');
    Route::get('/dashboard/formador', [DashboardController::class, 'formador'])->name('dashboard.formador');
    Route::get('/dashboard/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');

    // Cursos
    Route::get('/curso/{id}', function ($id) {
        $curso = Curso::with('materiais')->findOrFail($id);

        return Inertia::render('Courses/ShowCourse', [
            'course' => [
                'id' => $curso->id,
                'title' => $curso->nome,
                'description' => $curso->descricao,
                'image' => $curso->imagem_curso ? '/storage/' . $curso->imagem_curso : 'https://placehold.co/600x400',
                'materials' => $curso->materiais->map(function ($material) {
                    return [
                        'id' => $material->id,
                        'name' => $material->nome,
                        'description' => $material->nome, // Fallback as description doesn't exist
                        'thumbnail' => 'https://placehold.co/100', // Placeholder
                        'download_url' => '/storage/' . $material->caminho_ficheiro,
                    ];
                }),
            ]
        ]);
    })->name('ShowCourse');
    Route::get('/curso/{id}/materiais', function ($id) {
        return Inertia::render('Materials/CourseMaterials', ['id' => $id]);
    })->name('CourseMaterials');

    // Materiais (web session)
    Route::get('/materiais', [MaterialController::class, 'index'])->name('web.materiais.index');
    Route::patch('/materiais/{material}/conta-progresso', [MaterialController::class, 'updateContaProgresso'])->name('web.materiais.contaProgresso');
    Route::delete('/materiais/{material}', [MaterialController::class, 'destroy'])->name('web.materiais.destroy');

    // Progressos (web session)
    Route::get('/progressos', [ProgressoController::class, 'index'])->name('web.progressos.index');
    Route::post('/progressos-criar', [ProgressoController::class, 'store'])->name('web.progressos.store');
    Route::get('/progressos/cursos-completados', [ProgressoController::class, 'cursosCompletados'])->name('web.progressos.cursosCompletados');
     Route::get('/api-web/cursos', [CursoController::class, 'index'])->name('cursos.list');

    Route::get('/criar-curso', function () {
        return Inertia::render('Courses/CreateCourse', ['categorias' => Categoria::all()]);
    })->name('CreateCourse')->middleware('can:criar-cursos');
    Route::post('/cursos', [CursoController::class, 'store'])->name('cursos.store');

    Route::get('/editar-curso/{id?}', function ($id = null) {
        return Inertia::render('Courses/EditCourse', ['id' => $id]);
    })->name('EditCourse');

    Route::post('/editar-curso/{id}', function ($id, Request $request) {
        $curso = Curso::findOrFail($id);
        $user = auth()->user();

        if (!$user->isAdmin() && !$user->isFormador()) {
            return response()->json('Não é autorizado a atualizar cursos', 403);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:125|unique:cursos,nome,' . $curso->id,
            'descricao' => 'nullable|string',
            'area' => 'required|exists:categorias,id',
            'duracao' => 'required|string',
            'nivel' => 'required|in:iniciante,intermedio,avancado',
        ]);

        $curso->update($validated);

        return response()->json($curso, 200);
    })->name('cursos.update.web');
        Route::get('/notificacoes', function () {
        return Inertia::render('Notifications/AllNotifications', [
            'auth' => Auth::user(),
            'notifications' => Auth::user()->notifications ?? [],
        ]);
    })->name('notifications.index');

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

Route::get('/materiais-pendentes', function () {
    $user = auth()->user();

    if ($user->role !== 'admin' && $user->role !== 'formador') {
        abort(403, 'Não tens permissão');
    }

    $query = Material::where('status', 'pendente');

    if ($user->role === 'formador') {
        $cursoIds = Curso::where('formadores', $user->id)->pluck('id')->toArray();

        if (count($cursoIds) > 0) {
            $query->whereIn('id_curso', $cursoIds);
        } else {$query->where('id', 0);}}

$materiais = $query->with(['materialCurso', 'materialUser'])->latest()->get();

    return Inertia::render('Materials/PendingMaterials', [
        'materiais' => $materiais,
    ]);
})->name('PendingMaterials');

Route::patch('/materiais/{material}/status', function (Request $request, Material $material) {
    $user = auth()->user();

    if (!$user->isAdmin() && !$user->isFormador()) {
        return response()->json(['message' => 'Não tens permissão'], 403);
    }

    if ($user->isFormador()) {
        $cursoIds = $user->cursosLecionados()->pluck('id');
        if (!$cursoIds->contains($material->id_curso)) {
            return response()->json(['message' => 'Não tens permissão para este curso'], 403);
        }
    }

    $validated = $request->validate([
        'status' => 'required|in:aprovado,rejeitado',
    ]);

    $material->update([
        'status' => $validated['status'],
        'aprovado_por' => $user->id,
        'data_aprovacao' => now(),
    ]);

    return response()->json([
        'message' => 'Material atualizado com sucesso',
        'material' => $material
    ]);
})->name('materiais.updateStatus');

    // Subscrições
    Route::get('/subscrever', function () {
        return Inertia::render('Subscriptions/CreateSubscription');
    })->name('CreateSubscription');

    Route::post('/subscrever', [SubscriptionController::class, 'store'])->name('subscricoes.store');

    Route::get('/gerir-subscricao/{id}', function ($id) {
        return Inertia::render('Subscriptions/ManageSubscription', ['id' => $id]);
    })->name('ManageSubscription');

    Route::get('/progresso', function () {
        return Inertia::render('Progress/Progress');
    })->name('subscriptions.progress');

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
