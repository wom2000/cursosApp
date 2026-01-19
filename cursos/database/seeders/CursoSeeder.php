<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\User;
use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    public function run(): void
    {
        $formadores = User::where('role', 'formador')->pluck('id')->toArray();

        $cursos = [
            [
                'nome' => 'Laravel para Iniciantes',
                'area' => 1,
                'duracao' => '40 horas',
                'descricao' => 'Aprende Laravel desde o básico.',
                'nivel' => 'iniciante',
                'formadores' => $formadores[0],
            ],
            [
                'nome' => 'React Avançado',
                'area' => 1,
                'duracao' => '60 horas',
                'descricao' => 'Domina React e Next.js.',
                'nivel' => 'avancado',
                'formadores' => $formadores[0],
            ],
            [
                'nome' => 'Design UX/UI',
                'area' => 2,
                'duracao' => '50 horas',
                'descricao' => 'Cria interfaces intuitivas.',
                'nivel' => 'intermedio',
                'formadores' => $formadores[1],
            ],
            [
                'nome' => 'Marketing Digital',
                'area' => 3,
                'duracao' => '35 horas',
                'descricao' => 'SEO, SEM e redes sociais.',
                'nivel' => 'iniciante',
                'formadores' => $formadores[1],
            ],
            [
                'nome' => 'Python para Data Science',
                'area' => 1,
                'duracao' => '45 horas',
                'descricao' => 'Análise de dados com Python.',
                'nivel' => 'intermedio',
                'formadores' => $formadores[0],
            ],
        ];

        foreach ($cursos as $curso) {
            Curso::create($curso);
        }
    }
}
