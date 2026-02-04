<?php

namespace App\Http\Controllers;

use App\Models\Subscricao;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'plan' => 'required|in:mensal,anual',
        ]);

        $user = auth()->user();
        if ($user->isCesaeStudent()) {
            return redirect()
                ->back()
                ->with('error', 'Os alunos CESAE têm subscrição gratuita.');
        }
        if ($user->temSubscricaoAtiva()) {
            return redirect()
                ->back()
                ->with('error', 'Já tens uma subscrição ativa.');
        }

        $start = Carbon::today();

        if ($validated['plan'] === 'mensal') {
            $end = $start->copy()->addMonth();
            $message = 'Subscrito por um mês';
        } else {
            $end = $start->copy()->addYear();
            $message = 'Subscrito por um ano';
        }

        Subscricao::create([
            'user_id' => $user->id,
            'data_inicio' => $start->toDateString(),
            'data_fim' => $end->toDateString(),
            'status' => 'ativa',
        ]);

        return redirect()
            ->route('dashboard.estudante')
            ->with('success', $message);
    }
}
