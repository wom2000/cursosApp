<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model

{
    protected $table = 'materiais';

    protected $fillable =[
        'nome', 'id_user', 'id_curso', 'caminho_ficheiro', 'formato', 'status', 'aprovado_por', 'data_aprovacao',
    ];

    public function materialUser(){
        return $this->belongsTo(User::class, 'id_user');
    }

    public function materialCurso(){
        return $this->belongsTo(Curso::class, 'id_curso');
    }

    public function aprovadoPor(){
        return $this->belongsTo(User::class, 'aprovado_por');
    }

    public function progresso(){
        return $this->hasMany(Progresso::class, 'id_material');
    }
}
