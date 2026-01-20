<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscricao;
use Illuminate\Http\Request;

class SubscricaoController extends Controller
{
    // Listar subscrições do utilizador autenticado
    public function index()
    {
        $user = auth()->user();

        $subscricoes = $user->subscricoes()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $subscricoes
        ]);
    }

    // Criar nova subscrição
    public function store(Request $request)
    {
        $user = auth()->user();

        // Alunos CESAE não precisam de subscrição
        if ($user->isCesaeStudent()) {
            return response()->json([
                'success' => false,
                'message' => 'Alunos CESAE têm acesso grátis e não precisam de subscrição'
            ], 400);
        }

        // Verificar se já tem subscrição ativa
        if ($user->subscricaoAtiva()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Já tens uma subscrição ativa'
            ], 400);
        }

        $validated = $request->validate([
            'data_inicio' => 'required|date',
            'data_fim' => 'required|date|after:data_inicio',
        ]);

        $subscricao = Subscricao::create([
            'user_id' => $user->id,
            'data_inicio' => $validated['data_inicio'],
            'data_fim' => $validated['data_fim'],
            'status' => 'ativa',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Subscrição criada com sucesso',
            'data' => $subscricao
        ], 201);
    }

    // Ver subscrição específica
    public function show(Subscricao $subscricao)
    {
        $user = auth()->user();

        // Verificar se a subscrição pertence ao user (ou é admin)
        if ($subscricao->user_id !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para ver esta subscrição'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $subscricao
        ]);
    }

    // Atualizar subscrição (apenas admin)
    public function update(Request $request, Subscricao $subscricao)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Apenas administradores podem atualizar subscrições'
            ], 403);
        }

        $validated = $request->validate([
            'data_inicio' => 'sometimes|date',
            'data_fim' => 'sometimes|date|after:data_inicio',
            'status' => 'sometimes|in:ativa,expirada,cancelada',
        ]);

        $subscricao->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Subscrição atualizada com sucesso',
            'data' => $subscricao
        ]);
    }

    // Cancelar subscrição
    public function cancelar(Subscricao $subscricao)
    {
        $user = auth()->user();

        if ($subscricao->user_id !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão para cancelar esta subscrição'
            ], 403);
        }

        $subscricao->update(['status' => 'cancelada']);

        return response()->json([
            'success' => true,
            'message' => 'Subscrição cancelada com sucesso',
            'data' => $subscricao
        ]);
    }

    // Verificar acesso (útil para frontend)
    public function verificarAcesso()
    {
        $user = auth()->user();

        $hasAccess = $user->isCesaeStudent() || $user->subscricaoAtiva()->exists();

        return response()->json([
            'success' => true,
            'has_access' => $hasAccess,
            'is_cesae' => $user->isCesaeStudent(),
            'subscricao_ativa' => $user->subscricaoAtiva,
        ]);
    }

    // Renovar subscrição
    public function renovar(Subscricao $subscricao, Request $request)
    {
        $user = auth()->user();

        if ($subscricao->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Não tens permissão'
            ], 403);
        }

        $validated = $request->validate([
            'meses' => 'required|integer|min:1|max:12',
        ]);

        // Criar nova subscrição a partir da data de fim da anterior
        $dataInicio = $subscricao->data_fim->addDay();
        $dataFim = $dataInicio->copy()->addMonths($validated['meses']);

        $novaSubscricao = Subscricao::create([
            'user_id' => $user->id,
            'data_inicio' => $dataInicio,
            'data_fim' => $dataFim,
            'status' => 'ativa',
        ]);

        // Marcar a antiga como expirada
        $subscricao->update(['status' => 'expirada']);

        return response()->json([
            'success' => true,
            'message' => 'Subscrição renovada com sucesso',
            'data' => $novaSubscricao
        ]);
    }

    // Listar todas as subscrições (admin)
    public function todas()
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Apenas administradores podem ver todas as subscrições'
            ], 403);
        }

        $subscricoes = Subscricao::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $subscricoes
        ]);
    }
}
