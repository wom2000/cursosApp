<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Subscricao;
use Illuminate\Http\Request;

class SubscricaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $user = auth()->user();

        $subscricoes = $user->subscricoes()
            ->orderBy('created_at', 'desc')
            ->get(); 

        return response()->json($subscricoes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        if($user->isCesaeStudent()){
            return response()->json("os alunos CESAE têm subscrição gratuita", 400);
        }
        if($user->temSubscricaoAtiva()){
            return response()->json("a subscrição está ativa", 400);
        }
        $validated = $request->validate([
            'plan' => 'required|in:mensal,anual',
        ]);
        $dataInicio = now()->startOfDay();
        $dataFim = $validated['plan'] === 'anual'
            ? $dataInicio->copy()->addYear()
            : $dataInicio->copy()->addMonth();
        $subscricao = Subscricao::create([
            'user_id' => $user->id,
            'data_inicio' => $dataInicio,
            'data_fim' => $dataFim,
            'status' => 'ativa',
        ]);
        return response()->json($subscricao, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscricao $subscricao)
    {
        $user = auth()->user();
        if ($subscricao->user_id !== $user->id && !$user->isAdmin()) {
            return response()->json('Não tens permissão para ver esta subscrição', 403);
        }
        return response()->json($subscricao);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscricao $subscricao)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json('Apenas administradores podem atualizar subscrições', 403);
        }
        $validated = $request->validate([
            'data_inicio' => 'sometimes|date',
            'data_fim' => 'sometimes|date|after:data_inicio',
            'status' => 'sometimes|in:ativa,expirada,cancelada',
        ]);
        $subscricao->update($validated);
        return response()->json($subscricao);
    }

    public function cancelar(Subscricao $subscricao)
    {
        $user = auth()->user();
        if ($subscricao->user_id !== $user->id && !$user->isAdmin()) {
            return response()->json('Não tens permissão para cancelar esta subscrição', 403);
        }
        $subscricao->update(['status' => 'cancelada']);
        return response()->json($subscricao);
    }

    public function renovar(Subscricao $subscricao, Request $request)
    {
        $user = auth()->user();
        if ($subscricao->user_id !== $user->id) {
            return response()->json('Não tens permissão', 403);
        }
        $validated = $request->validate([
            'meses' => 'required|integer|min:1|max:12',
        ]);
        $dataInicio = $subscricao->data_fim->addDay();
        $dataFim = $dataInicio->copy()->addMonths($validated['meses']);
        $novaSubscricao = Subscricao::create([
            'user_id' => $user->id,
            'data_inicio' => $dataInicio,
            'data_fim' => $dataFim,
            'status' => 'ativa',
        ]);
        $subscricao->update(['status' => 'expirada']);
        return response()->json($novaSubscricao);
    }
    public function todas()
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json('Apenas administradores podem ver todas as subscrições', 403);
        }

        $subscricoes = Subscricao::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return response()->json($subscricoes);
    }
}

// Resumo: Gere subscricoes (listar, criar, atualizar, cancelar e renovar).
