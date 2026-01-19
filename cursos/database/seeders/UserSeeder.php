<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@cesae.pt',
            'password' => Hash::make('password'),
            'telemovel' => '912345678',
            'role' => 'admin',
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // Formador 1
        User::create([
            'name' => 'João Silva',
            'email' => 'joao@cesae.pt',
            'password' => Hash::make('password'),
            'telemovel' => '913456789',
            'role' => 'formador',
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // Formador 2
        User::create([
            'name' => 'Maria Santos',
            'email' => 'maria@cesae.pt',
            'password' => Hash::make('password'),
            'telemovel' => '914567890',
            'role' => 'formador',
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // Estudante CESAE
        User::create([
            'name' => 'Pedro Costa',
            'email' => 'pedro@cesae.pt',
            'password' => Hash::make('password'),
            'telemovel' => '915678901',
            'role' => 'estudante',
            'cesae_student' => true,
            'email_verified_at' => now(),
        ]);

        // Estudante Normal
        User::create([
            'name' => 'Ana Ferreira',
            'email' => 'ana@gmail.com',
            'password' => Hash::make('password'),
            'telemovel' => '916789012',
            'role' => 'estudante',
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // Mais 10 estudantes
        User::factory(10)->create([
            'role' => 'estudante',
            'cesae_student' => false,
        ]);
    }
}
