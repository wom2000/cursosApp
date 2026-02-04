<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progresso extends Model
{
    protected $table = 'progressos';

    protected $fillable=[
        'id_user', 'id_material', 'status', 'completado_em',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'id_user');
    }

    public function material(){
        return $this->belongsTo(Material::class, 'id_material');
    }

    public function curso(){
        return $this->hasOneThrough(Curso::class, Material::class,
            'id', 'id','id_material', 'id_curso');
    }
}

// Resumo: Guarda o estado do aluno por material e liga ao utilizador, material e curso correspondente.
