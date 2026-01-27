<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    const ROLE_ADMIN = "admin";
    const ROLE_FORMADOR = "formador";
    const ROLE_ESTUDANTE = "estudante";


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'telemovel',
        'role',
        'cesae_student',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'cesae_student' => 'boolean',
        ];
    }

    public function cursosLecionados(){
        return $this->hasMany(Curso::class, 'formadores');
    }

    public function materiais(){
        return $this->hasMany(Material::class, 'id_user');
    }

    public function materiaisAprovados(){
        return $this->hasMany(Material::class, 'aprovado_por');
    }

    public function progressos(){
        return $this->hasMany(Progresso::class, 'id_user');
    }

    public function subscricao(){
        return $this->hasOne(Subscricao::class);
    }
    public function subscricoes(){
        return $this->hasMany(Subscricao::class);
    }

    public function isAdmin(): bool{
        return $this->role === self::ROLE_ADMIN;
    }

    public function isFormador(): bool{
        return $this->role === self::ROLE_FORMADOR;
    }

    public function isEstudante(): bool{
        return $this->role === self::ROLE_ESTUDANTE;
    }

    public function isCesaeStudent(): bool{
        return $this->cesae_student;
    }

    public function temSubscricaoAtiva():bool{
        return $this->subscricao()->where('status', 'ativa')->exists();
    }

    public function hasAcessoCursos(): bool{
        return $this->isCesaeStudent() || $this->temSubscricaoAtiva();
    }

    public function podeAprovarMateriais(): bool{
        return $this->isAdmin() || $this->isFormador();
    }
}
