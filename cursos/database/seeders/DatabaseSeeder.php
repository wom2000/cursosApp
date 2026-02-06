<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Curso;
use App\Models\Material;
use App\Models\Categoria;
use App\Models\Subscricao;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\ImagensCursosSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ============================================
        // USERS
        // ============================================

        // Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@cursos.com',
            'password' => Hash::make('password'),
            'telemovel' => '910000000',
            'role' => User::ROLE_ADMIN,
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // Formadores
        $formador1 = User::create([
            'name' => 'João Silva',
            'email' => 'joao@cursos.com',
            'password' => Hash::make('password'),
            'telemovel' => '910000001',
            'role' => User::ROLE_FORMADOR,
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        $formador2 = User::create([
            'name' => 'Maria Santos',
            'email' => 'maria@cursos.com',
            'password' => Hash::make('password'),
            'telemovel' => '910000002',
            'role' => User::ROLE_FORMADOR,
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // Estudantes
        $estudante1 = User::create([
            'name' => 'Pedro Costa',
            'email' => 'pedro@exemplo.com',
            'password' => Hash::make('password'),
            'telemovel' => '910000003',
            'role' => User::ROLE_ESTUDANTE,
            'cesae_student' => true, // Aluno CESAE - acesso gratuito
            'email_verified_at' => now(),
        ]);

        $estudante2 = User::create([
            'name' => 'Ana Oliveira',
            'email' => 'ana@exemplo.com',
            'password' => Hash::make('password'),
            'telemovel' => '910000004',
            'role' => User::ROLE_ESTUDANTE,
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        $estudante3 = User::create([
            'name' => 'Carlos Ferreira',
            'email' => 'carlos@exemplo.com',
            'password' => Hash::make('password'),
            'telemovel' => '910000005',
            'role' => User::ROLE_ESTUDANTE,
            'cesae_student' => false,
            'email_verified_at' => now(),
        ]);

        // ============================================
        // SUBSCRIÇÕES
        // ============================================

        // Subscrição ativa para Ana
        Subscricao::create([
            'user_id' => $estudante2->id,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonths(2),
            'status' => 'ativa',
        ]);

        // Subscrição expirada para Carlos
        Subscricao::create([
            'user_id' => $estudante3->id,
            'data_inicio' => now()->subMonths(6),
            'data_fim' => now()->subMonth(),
            'status' => 'expirada',
        ]);

        // ============================================
        // CATEGORIAS
        // ============================================

        $webDev = Categoria::create([
            'nome' => 'Desenvolvimento Web',
            'descricao' => 'Cursos relacionados com desenvolvimento web, frontend e backend',
        ]);

        $mobile = Categoria::create([
            'nome' => 'Desenvolvimento Mobile',
            'descricao' => 'Cursos de criação de aplicações móveis para iOS e Android',
        ]);

        $dataSci = Categoria::create([
            'nome' => 'Data Science',
            'descricao' => 'Análise de dados, Machine Learning e Inteligência Artificial',
        ]);

        $design = Categoria::create([
            'nome' => 'Design',
            'descricao' => 'Design gráfico, UI/UX e design de interfaces',
        ]);

        $marketing = Categoria::create([
            'nome' => 'Marketing Digital',
            'descricao' => 'Marketing online, SEO, redes sociais e estratégias digitais',
        ]);

        // ============================================
        // CURSOS
        // ============================================

        $cursoReact = Curso::create([
            'nome' => 'React para Iniciantes',
            'descricao' => 'Aprende React do zero. Componentes, hooks, state management e muito mais.',
            'area' => $webDev->id,
            'duracao' => '40 horas',
            'nivel' => 'iniciante',
            'formadores' => $formador1->id,
        ]);

        $cursoLaravel = Curso::create([
            'nome' => 'Laravel Avançado',
            'descricao' => 'Domina Laravel: APIs, autenticação, eloquent avançado, jobs, queues.',
            'area' => $webDev->id,
            'duracao' => '60 horas',
            'nivel' => 'avancado',
            'formadores' => $formador1->id,
        ]);

        $cursoFlutter = Curso::create([
            'nome' => 'Flutter - Apps Multiplataforma',
            'descricao' => 'Cria apps nativas para iOS e Android com Flutter e Dart.',
            'area' => $mobile->id,
            'duracao' => '50 horas',
            'nivel' => 'intermedio',
            'formadores' => $formador2->id,
        ]);

        $cursoPython = Curso::create([
            'nome' => 'Python para Data Science',
            'descricao' => 'Python, Pandas, NumPy, visualização de dados e machine learning.',
            'area' => $dataSci->id,
            'duracao' => '70 horas',
            'nivel' => 'intermedio',
            'formadores' => $formador2->id,
        ]);

        $cursoUX = Curso::create([
            'nome' => 'UX/UI Design Fundamentals',
            'descricao' => 'Princípios de design, pesquisa de utilizadores, prototipagem e testes.',
            'area' => $design->id,
            'duracao' => '35 horas',
            'nivel' => 'iniciante',
            'formadores' => $formador1->id,
        ]);
        $this->call(ImagensCursosSeeder::class);
        // ============================================
        // MATERIAIS
        // ============================================

        // Materiais do curso React (aprovados)
        Material::create([
            'nome' => 'Introdução ao React',
            'id_user' => $formador1->id,
            'id_curso' => $cursoReact->id,
            'caminho_ficheiro' => 'materiais/react-intro.pdf',
            'formato' => 'pdf',
            'status' => 'aprovado',
            'aprovado_por' => $admin->id,
            'data_aprovacao' => now()->subDays(10),
        ]);

        Material::create([
            'nome' => 'Componentes e Props',
            'id_user' => $formador1->id,
            'id_curso' => $cursoReact->id,
            'caminho_ficheiro' => 'materiais/react-components.mp4',
            'formato' => 'mp4',
            'status' => 'aprovado',
            'aprovado_por' => $admin->id,
            'data_aprovacao' => now()->subDays(9),
        ]);

        Material::create([
            'nome' => 'Hooks em React',
            'id_user' => $formador1->id,
            'id_curso' => $cursoReact->id,
            'caminho_ficheiro' => 'materiais/react-hooks.pdf',
            'formato' => 'pdf',
            'status' => 'aprovado',
            'aprovado_por' => $formador1->id,
            'data_aprovacao' => now()->subDays(8),
        ]);

        // Materiais do curso Laravel (alguns aprovados, outros pendentes)
        Material::create([
            'nome' => 'Arquitetura Laravel',
            'id_user' => $formador1->id,
            'id_curso' => $cursoLaravel->id,
            'caminho_ficheiro' => 'materiais/laravel-arch.pdf',
            'formato' => 'pdf',
            'status' => 'aprovado',
            'aprovado_por' => $admin->id,
            'data_aprovacao' => now()->subDays(5),
        ]);

        Material::create([
            'nome' => 'Eloquent Relationships',
            'id_user' => $estudante1->id, // Submetido por estudante
            'id_curso' => $cursoLaravel->id,
            'caminho_ficheiro' => 'materiais/eloquent-relations.pdf',
            'formato' => 'pdf',
            'status' => 'pendente',
            'aprovado_por' => null,
            'data_aprovacao' => null,
        ]);

        Material::create([
            'nome' => 'APIs RESTful com Laravel',
            'id_user' => $formador1->id,
            'id_curso' => $cursoLaravel->id,
            'caminho_ficheiro' => 'materiais/laravel-api.mp4',
            'formato' => 'mp4',
            'status' => 'pendente',
            'aprovado_por' => null,
            'data_aprovacao' => null,
        ]);

        // Materiais do curso Flutter
        Material::create([
            'nome' => 'Setup Flutter',
            'id_user' => $formador2->id,
            'id_curso' => $cursoFlutter->id,
            'caminho_ficheiro' => 'materiais/flutter-setup.pdf',
            'formato' => 'pdf',
            'status' => 'aprovado',
            'aprovado_por' => $formador2->id,
            'data_aprovacao' => now()->subDays(7),
        ]);

        Material::create([
            'nome' => 'Widgets Essenciais',
            'id_user' => $formador2->id,
            'id_curso' => $cursoFlutter->id,
            'caminho_ficheiro' => 'materiais/flutter-widgets.mp4',
            'formato' => 'mp4',
            'status' => 'aprovado',
            'aprovado_por' => $formador2->id,
            'data_aprovacao' => now()->subDays(6),
        ]);

        // Material rejeitado
        Material::create([
            'nome' => 'Tutorial Desatualizado',
            'id_user' => $estudante2->id,
            'id_curso' => $cursoFlutter->id,
            'caminho_ficheiro' => 'materiais/old-tutorial.pdf',
            'formato' => 'pdf',
            'status' => 'rejeitado',
            'aprovado_por' => $formador2->id,
            'data_aprovacao' => now()->subDays(3),
        ]);

        echo "\n✅ Seeders executados com sucesso!\n\n";
        echo "📧 Credenciais de acesso:\n";
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        echo "Admin:      admin@cursos.com / password\n";
        echo "Formador 1: joao@cursos.com / password\n";
        echo "Formador 2: maria@cursos.com / password\n";
        echo "Estudante (CESAE): pedro@exemplo.com / password\n";
        echo "Estudante (c/ subscrição): ana@exemplo.com / password\n";
        echo "Estudante (sem acesso): carlos@exemplo.com / password\n";
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    }
}
