<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscricao extends Model
{
    use HasFactory;

    protected $table = 'subscricoes';

    protected $fillable = [
        'user_id',
        'data_inicio',
        'data_fim',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'data_inicio' => 'date',
            'data_fim' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeAtivas($query)
    {
        return $query->where('status', 'ativa');
    }

    public function scopeExpiradas($query)
    {
        return $query->where('status', 'expirada');
    }

    public function isAtiva(): bool
    {
        return $this->status === 'ativa' && $this->data_fim >= now();
    }
}
