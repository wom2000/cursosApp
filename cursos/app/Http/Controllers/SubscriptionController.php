<?php

namespace App\Http\Controllers;

use App\Models\Subscricao;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function manage($id)
    {
        $user = auth()->user();

        if ($user->id != $id) {
            abort(403, 'Não tens permissão para ver esta subscrição');
        }

        $subscricao = Subscricao::where('user_id', $id)
            ->where('status', 'ativa')
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('Subscriptions/ManageSubscription', [
            'subscricao' => $subscricao,
            'userId' => $id,
        ]);
    }

    public function cancelar($id)
    {
        $user = auth()->user();
        $subscricao = Subscricao::findOrFail($id);

        if ($subscricao->user_id !== $user->id && !$user->isAdmin()) {
            return response()->json(['message' => 'Não tens permissão para cancelar esta subscrição'], 403);
        }

        $subscricao->update(['status' => 'cancelada']);

        return response()->json($subscricao);
    }
}
