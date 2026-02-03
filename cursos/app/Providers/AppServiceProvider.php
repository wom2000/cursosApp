<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Gate::define('criar-cursos', function ($user) {
            return $user->role === 'admin' || $user->role === 'formador';
        });
Gate::define('criar-categorias', function ($user) {
    return $user->role === 'admin';
});

    }
}
