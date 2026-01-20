<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Curso;
use App\Models\User;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $cursos = Curso::all();
        $admin = User::where('role', 'admin')->first();

        foreach ($cursos as $curso) {
            // 3 materiais aprovados
            for ($i = 1; $i <= 3; $i++) {
                Material::create([
                    'nome' => "Aula $i - " . $curso->nome,
                    'id_user' => $curso->formadores,
                    'id_curso' => $curso->id,
                    'caminho_ficheiro' => 'materiais/exemplo_' . $i . '.pdf',
                    'formato' => 'pdf',
                    'status' => 'aprovado',
                    'aprovado_por' => $admin->id,
                    'data_aprovacao' => now(),
                ]);
            }

            // 1 material pendente
            Material::create([
                'nome' => "Material Pendente - " . $curso->nome,
                'id_user' => $curso->formadores,
                'id_curso' => $curso->id,
                'caminho_ficheiro' => 'materiais/pendente.pdf',
                'formato' => 'pdf',
                'status' => 'pendente',
            ]);
        }
    }
}
