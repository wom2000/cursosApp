<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            ['nome' => 'Programação', 'descricao' => 'Cursos de programação'],
            ['nome' => 'Design', 'descricao' => 'Cursos de design'],
            ['nome' => 'Marketing Digital', 'descricao' => 'Marketing online'],
            ['nome' => 'Gestão de Projetos', 'descricao' => 'Gestão de projetos'],
            ['nome' => 'Base de Dados', 'descricao' => 'SQL e NoSQL'],
            ['nome' => 'Cloud Computing', 'descricao' => 'AWS, Azure, Google Cloud'],
            ['nome' => 'Segurança Informática', 'descricao' => 'Cibersegurança'],
            ['nome' => 'DevOps', 'descricao' => 'CI/CD e automação'],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
