<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    const ROLE_ADMIN = "admin";
    const ROLE_FORMADOR = "formador";
    const ROLE_ESTUDANTE = "estudante";

    protected $fillable = [
        'name',
        'email',
        'password',
        'telemovel',
        'role',
        'cesae_student',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'cesae_student' => 'boolean',
        ];
    }

    // RELAÇÕES

    // Cursos que o formador leciona
    public function cursosLecionados()
    {
        return $this->hasMany(Curso::class, 'formadores');
    }

    // Materiais carregados pelo utilizador
    public function materiais()
    {
        return $this->hasMany(Material::class, 'id_user');
    }

    // Materiais aprovados pelo utilizador (admin/formador)
    public function materiaisAprovados()
    {
        return $this->hasMany(Material::class, 'aprovado_por');
    }

    // Progressos do utilizador
    public function progressos()
    {
        return $this->hasMany(ProgressoCurso::class, 'id_user');
    }

    // Subscrições do utilizador
    public function subscricoes()
    {
        return $this->hasMany(Subscricao::class);
    }

    // Subscrição ativa do utilizador
    public function subscricaoAtiva()
    {
        return $this->hasOne(Subscricao::class)->where('status', 'ativa')->latest();
    }

    // MÉTODOS HELPER

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isFormador(): bool
    {
        return $this->role === self::ROLE_FORMADOR;
    }

    public function isEstudante(): bool
    {
        return $this->role === self::ROLE_ESTUDANTE;
    }

    public function isCesaeStudent(): bool
    {
        return $this->cesae_student;
    }

    // Verificar se tem acesso a cursos (CESAE ou subscrição ativa)
    public function hasAcessoCursos(): bool
    {
        return $this->cesae_student || $this->subscricaoAtiva()->exists();
    }

    // Verificar se pode aprovar materiais
    public function podeAprovarMateriais(): bool
    {
        return $this->isAdmin() || $this->isFormador();
    }
}
