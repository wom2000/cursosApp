<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'area',
        'duracao',
        'descricao',
        'nivel',
        'formadores',
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

    public function progressos()
    {
        return $this->hasManyThrough(
            ProgressoCurso::class,
            Material::class,
            'id_curso',
            'id_material',
            'id',
            'id'
        );
    }
}
