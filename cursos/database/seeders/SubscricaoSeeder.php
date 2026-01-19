<?php

namespace Database\Seeders;

use App\Models\Subscricao;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubscricaoSeeder extends Seeder
{
    public function run(): void
    {
        $estudantes = User::where('role', 'estudante')
            ->where('cesae_student', false)
            ->get();

        foreach ($estudantes as $estudante) {
            if (rand(0, 1)) {
                Subscricao::create([
                    'user_id' => $estudante->id,
                    'data_inicio' => now()->subDays(rand(1, 60)),
                    'data_fim' => now()->addMonths(6),
                    'status' => 'ativa',
                ]);
            }
        }
    }
}
