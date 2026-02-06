<?php

namespace App\Notifications;

use App\Models\Material;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class MaterialAprovado extends Notification
{
    use Queueable;

    public function __construct(
        private readonly Material $material,
        private readonly User $aprovadoPor,
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => sprintf(
                'O teu material "%s" foi aprovado por %s.',
                $this->material->nome,
                $this->aprovadoPor->name,
            ),
            'material_id' => $this->material->id,
            'curso_id' => $this->material->id_curso,
        ];
    }
}
