<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index(Request $request)
{
    try {
        $tipo = $request->query('tipo', 'todos');
        $query = User::query();

        switch ($tipo) {
            case 'subscritor':
                $query->whereHas('subscricao', function($q) {
                    $q->where('status', 'ativa');
                });
                break;

            case 'estudante_sem_sub':
                $query->where('role', 'estudante')
                      ->where(function($q) {
                          $q->where('cesae_student', false)
                            ->orWhereNull('cesae_student');
                      })
                      ->whereDoesntHave('subscricao', function($q) {
                          $q->where('status', 'ativa');
                      });
                break;

            case 'formador':
                $query->where('role', 'formador');
                break;

            case 'admin':
                $query->where('role', 'admin');
                break;

            case 'todos':
            default:
                break;
        }

        $users = $query->select('id', 'name', 'email', 'role', 'cesae_student', 'created_at')
                       ->latest()
                       ->get();

        return response()->json($users);

    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ], 500);
    }
}

    public function destroy(User $user)
    {
        $authUser = auth()->user();
        if (!$authUser || $authUser->role !== 'admin') {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
        if ($user->id === $authUser->id) {
            return response()->json(['message' => 'Não pode apagar o próprio utilizador'], 403);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'Utilizador apagado com sucesso']);
    }

    public function updateCesae(User $user, Request $request)
    {
        $authUser = auth()->user();
        if (!$authUser || $authUser->role !== 'admin') {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
        $validated = $request->validate([
            'cesae_student' => 'required|boolean',
        ]);
        $user->update([
            'cesae_student' => $validated['cesae_student'],
        ]);
        return response()->json([
            'success' => true,
            'user' => $user->only('id', 'cesae_student'),
        ]);
    }

    public function updateRole(User $user, Request $request)
    {
        $authUser = auth()->user();
        if (!$authUser || $authUser->role !== 'admin') {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
        $validated = $request->validate([
            'role' => 'required|in:admin,formador,estudante',
        ]);
        $user->update([
            'role' => $validated['role'],
        ]);
        return response()->json([
            'success' => true,
            'user' => $user->only('id', 'role'),
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->isAdmin()) {
            return response()->json('Não é autorizado a criar users', 403);
        }
       $validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|string|email|max:255|unique:users,email',
    'password' => 'required|string|min:8|confirmed',
    'role' => 'required|in:admin,formador,estudante',
    'cesae_student' => 'nullable|boolean',
]);

$user = User::create([
    'name' => $validated['name'],
    'email' => $validated['email'],
    'password' => Hash::make($validated['password']),
    'role' => $validated['role'],
    'cesae_student' => $validated['cesae_student'] ?? false,
]);


        return redirect()->route('dashboard');
    }

}

// Resumo: Lista utilizadores e filtra por estado de subscricao.
