<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressoCurso extends Model
{
    use HasFactory;

    protected $table = 'progresso_curso';

    protected $fillable = [
        'id_user',
        'id_material',
        'status',
        'completado_em',
    ];

    protected function casts(): array
    {
        return [
            'completado_em' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function material()
    {
        return $this->belongsTo(Material::class, 'id_material');
    }

    public function curso()
    {
        return $this->hasOneThrough(
            Curso::class,
            Material::class,
            'id',
            'id',
            'id_material',
            'id_curso'
        );
    }

    public function scopeVistos($query)
    {
        return $query->where('status', 'visto');
    }

    public function scopeAVer($query)
    {
        return $query->where('status', 'a_ver');
    }
}
