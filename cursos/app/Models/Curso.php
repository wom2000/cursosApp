<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = [
        'nome',
        'descricao',
        'area',
        'duracao',
        'nivel',
        'formadores',
        'curso_completado',
        'curso_completado_em',
        'imagem_curso'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'area');
    }

    public function formador()
    {
        return $this->belongsTo(User::class, 'formadores');
    }

    public function materiais()
    {
        return $this->hasMany(Material::class, 'id_curso');
    }

    public function progresso()
    {
        return $this->hasManyThrough(
            Progresso::class,
            Material::class,
            'id_curso',
            'id_material'
        );
    }
}
