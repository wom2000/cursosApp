<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $table = 'materiais';

    protected $fillable = [
        'nome',
        'id_user',
        'id_curso',
        'caminho_ficheiro',
        'formato',
        'status',
        'aprovado_por',
        'data_aprovacao',
    ];

    protected function casts(): array
    {
        return [
            'data_aprovacao' => 'datetime',
        ];
    }

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function aprovadoPor()
    {
        return $this->belongsTo(User::class, 'aprovado_por');
    }

    public function progressos()
    {
        return $this->hasMany(ProgressoCurso::class, 'id_material');
    }

    public function scopeAprovados($query)
    {
        return $query->where('status', 'aprovado');
    }

    public function scopePendentes($query)
    {
        return $query->where('status', 'pendente');
    }
}
