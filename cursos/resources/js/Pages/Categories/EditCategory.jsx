import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import '../../../css/EditCategory.css';

export default function EditCategory({ auth }) {
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [data, setData] = useState({ nome: "", descricao: "" });

    useEffect(() => {
        fetch('/api/categorias', { credentials: 'include' })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao carregar categorias');
                return res.json();
            })
            .then(data => {
                setCategorias(Array.isArray(data) ? data : (data.categorias || []));
                setLoading(false);
            })
            .catch(error => {
                setErro(error.message);
                setLoading(false);
            });
    }, []);

    const carregarCategoriaParaEdicao = (categoriaId) => {
        setLoading(true);
        setErro(null);
        fetch(`/api/categorias/${categoriaId}`, { credentials: 'include' })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao carregar categoria');
                return res.json();
            })
            .then(data => {
                const cat = data.categoria || data;
                setCategoria(cat);
                setData({ nome: cat.nome || "", descricao: cat.descricao || "" });
                setSelectedCategoryId(cat.id);
                setLoading(false);
            })
            .catch(error => {
                setErro(error.message);
                setLoading(false);
            });
    };

    const submit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch(`/api/categorias/${selectedCategoryId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error(`Erro ao atualizar: ${res.status}`);
                return res.json();
            })
            .then(() => {
                alert('Categoria atualizada com sucesso!');
                setCategoria(null);
                setSelectedCategoryId(null);
                setData({ nome: "", descricao: "" });
                fetch('/api/categorias', { credentials: 'include' })
                    .then(res => res.json())
                    .then(data => setCategorias(Array.isArray(data) ? data : (data.categorias || [])));
            })
            .catch(error => {
                alert(error.message);
            });
    };

    const eliminar = () => {
        if (!window.confirm('Tem a certeza que deseja eliminar esta categoria?')) return;

        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch(`/api/categorias/${selectedCategoryId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': token,
                'Accept': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`Erro ao eliminar: ${res.status}`);
                return res.json();
            })
            .then(() => {
                alert('Categoria eliminada com sucesso!');
                setCategoria(null);
                setSelectedCategoryId(null);
                setData({ nome: "", descricao: "" });
                fetch('/api/categorias', { credentials: 'include' })
                    .then(res => res.json())
                    .then(data => setCategorias(Array.isArray(data) ? data : (data.categorias || [])));
            })
            .catch(error => {
                alert(error.message);
            });
    };

    if (loading) {
        return (
            <MainLayout user={auth?.user}>
                <Head title="Editar Categorias" />
                <div className="edit-category-container">
                    <p className="loading-message">A carregar...</p>
                </div>
            </MainLayout>
        );
    }

    if (erro) {
        return (
            <MainLayout user={auth?.user}>
                <Head title="Editar Categorias" />
                <div className="edit-category-container">
                    <p className="error-message-box">{erro}</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout user={auth?.user}>
            <Head title="Editar Categorias" />

            <div className="edit-category-container">
                <div className="edit-category-header">
                    <h1 className="edit-category-title">Editar Categorias</h1>
                    <p className="edit-category-subtitle">
                        {categoria ? 'Atualize as informações da categoria' : 'Selecione uma categoria para editar'}
                    </p>
                </div>

                {!categoria ? (
                    <div className="category-grid">
                        {categorias.map(cat => (
                            <div
                                key={cat.id}
                                className="category-card"
                                onClick={() => carregarCategoriaParaEdicao(cat.id)}
                            >
                                <h3>{cat.nome}</h3>
                                <p>{cat.descricao || 'Sem descrição'}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={submit} className="edit-category-form">
                        <div className="form-group">
                            <label className="form-label">Nome *</label>
                            <input
                                type="text"
                                className="form-input"
                                value={data.nome}
                                onChange={e => setData(d => ({ ...d, nome: e.target.value }))}
                                placeholder="Nome da categoria"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Descrição</label>
                            <textarea
                                className="form-textarea"
                                value={data.descricao}
                                onChange={e => setData(d => ({ ...d, descricao: e.target.value }))}
                                placeholder="Descrição da categoria..."
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => { setCategoria(null); setSelectedCategoryId(null); }}
                                className="btn-secondary"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn-primary">
                                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Atualizar
                            </button>
                            <button
                                type="button"
                                onClick={eliminar}
                                className="btn-danger"
                            >
                                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </MainLayout>
    );
}

// Resumo: Lista categorias, permite selecionar, editar e eliminar.
// React: useState/useEffect para carregar e editar dados.
