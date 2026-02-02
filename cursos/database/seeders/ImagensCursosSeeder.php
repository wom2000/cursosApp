<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ImagensCursosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('cursos')->where('id', 1)->update([
            'imagem_curso' => 'imagensCursos/react.png'
        ]);

        DB::table('cursos')->where('id', 2)->update([
            'imagem_curso' => 'imagensCursos/laravel.png'
        ]);

        DB::table('cursos')->where('id', 3)->update([
            'imagem_curso' => 'imagensCursos/coordenador_formacao.png'
        ]);
        DB::table('cursos')->where('id', 4)->update([
            'imagem_curso' => 'imagensCursos/e_formador.png'
        ]);
        DB::table('cursos')->where('id', 5)->update([
            'imagem_curso' => 'imagensCursos/uiux.png'
        ]);
    }
}
