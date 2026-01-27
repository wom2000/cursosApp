<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscricao extends Model
{

    protected $table = 'subscricoes';

    protected $fillable = [
        'user_id', 'data_inicio', 'data_fim', 'status',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
