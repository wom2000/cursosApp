import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "../../css/UsersAdmin.css";

export default function UsersAdmin({ auth }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tipoFiltro, setTipoFiltro] = useState('todos');
    const [erro, setErro] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchUsers = (tipo = 'todos') => {
        setLoading(true);
        setErro(null);

        let url = '/api/users';
        if (tipo !== 'todos') {
            url += `?tipo=${tipo}`;
        }

        fetch(url, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao carregar utilizadores');
                return res.json();
            })
            .then(data => {
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                setErro(err.message);
                setLoading(false);
                setUsers([]);
            });
    };

    useEffect(() => {
        fetchUsers(tipoFiltro);
    }, [tipoFiltro]);

    const handleDelete = (id) => {
        if (!window.confirm('Tem a certeza que deseja apagar este utilizador?')) return;
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao apagar utilizador');
                setUsers(users.filter(u => u.id !== id));
                alert('Utilizador apagado com sucesso!');
            })
            .catch(err => alert(err.message));
    };

    const handleToggleCesae = (user) => {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute('content');
        setUpdatingId(user.id);
        fetch(`/api/users/${user.id}/cesae`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                cesae_student: !user.cesae_student
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao atualizar CESAE');
                return res.json();
            })
            .then(() => {
                setUsers(users.map(u =>
                    u.id === user.id
                        ? { ...u, cesae_student: !u.cesae_student }
                        : u
                ));
            })
            .catch(err => alert(err.message))
            .finally(() => setUpdatingId(null));
    };

    const getRoleBadgeClass = (role) => {
        return `user-role ${role?.toLowerCase() || 'estudante'}`;
    };

    return (
        <MainLayout user={auth?.user}>
            <Head title="Gerir Utilizadores" />

            <div className="users-admin-container">
                <div className="users-admin-header">
                    <h1 className="users-admin-title">Gerir Utilizadores</h1>
                    <p className="users-admin-subtitle">
                        Administre e controle os utilizadores da plataforma
                    </p>
                </div>

                {!loading && !erro && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">{users.length}</div>
                            <div className="stat-label">Total</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">
                                {users.filter(u => u.role === 'formador').length}
                            </div>
                            <div className="stat-label">Formadores</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">
                                {users.filter(u => u.role === 'estudante').length}
                            </div>
                            <div className="stat-label">Estudantes</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">
                                {users.filter(u => u.role === 'admin').length}
                            </div>
                            <div className="stat-label">Admins</div>
                        </div>
                    </div>
                )}

                <div className="filter-buttons">
                    <button
                        onClick={() => setTipoFiltro('todos')}
                        className={`filter-btn ${tipoFiltro === 'todos' ? 'active' : ''}`}
                        disabled={tipoFiltro === 'todos'}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setTipoFiltro('subscritor')}
                        className={`filter-btn ${tipoFiltro === 'subscritor' ? 'active' : ''}`}
                        disabled={tipoFiltro === 'subscritor'}
                    >
                        Subscritores
                    </button>
                    <button
                        onClick={() => setTipoFiltro('estudante_sem_sub')}
                        className={`filter-btn ${tipoFiltro === 'estudante_sem_sub' ? 'active' : ''}`}
                        disabled={tipoFiltro === 'estudante_sem_sub'}
                    >
                        Estudantes sem Subscrição
                    </button>
                    <button
                        onClick={() => setTipoFiltro('formador')}
                        className={`filter-btn ${tipoFiltro === 'formador' ? 'active' : ''}`}
                        disabled={tipoFiltro === 'formador'}
                    >
                        Formadores
                    </button>
                </div>

                <div className="table-container">
                    {loading ? (
                        <p className="loading-message">A carregar utilizadores...</p>
                    ) : erro ? (
                        <p className="error-message">{erro}</p>
                    ) : users.length === 0 ? (
                        <div className="no-users">
                            <svg className="no-users-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3>Nenhum utilizador encontrado</h3>
                            <p>Não há utilizadores que correspondam ao filtro selecionado.</p>
                        </div>
                    ) : (
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                    <th>CESAE</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={getRoleBadgeClass(user.role)}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={user.cesae_student ? "cesae-badge on" : "cesae-badge off"}>
                                                {user.cesae_student ? "Sim" : "Não"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleToggleCesae(user)}
                                                    className="btn-cesae"
                                                    disabled={updatingId === user.id}
                                                >
                                                    {user.cesae_student ? 'Remover CESAE' : 'Marcar CESAE'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn-delete"
                                                >
                                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Apagar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
