import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import "../../../css/EditCourse.css";

export default function EditCourse({ id }) {
    const { auth } = usePage().props;
    const [cursos, setCursos] = useState([]);
    const [curso, setCurso] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(id || null);

    const { data, setData, put, processing, errors } = useForm({
        nome: "",
        descricao: "",
        area: "",
        duracao: "",
        nivel: "",
        imagem: null,
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        fetch('/api/cursos/meus-cursos', {
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(res => {
                if (res.status === 401) {
                    return res.json().then(data => {
                        setErro('Você precisa estar autenticado para editar cursos.');
                        setLoading(false);
                        throw new Error('Unauthorized');
                    });
                }
                if (res.status === 403) {
                    setErro('Você não tem permissão para editar cursos.');
                    setLoading(false);
                    throw new Error('Forbidden');
                }
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const cursosArray = Array.isArray(data) ? data : (data.cursos || []);
                setCursos(cursosArray);

                if (id && cursosArray.length > 0) {
                    const cursoExistente = cursosArray.find(c => c.id == id);
                    if (cursoExistente) {
                        setSelectedCourseId(id);
                        carregarCursoParaEdicao(id, cursosArray);
                        return;
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                if (error.message !== 'Unauthorized' && error.message !== 'Forbidden') {
                    console.error('Erro ao carregar cursos:', error);
                    setErro(`Erro ao carregar cursos: ${error.message}`);
                }
                setLoading(false);
            });
    }, []);

    const carregarCursoParaEdicao = (cursoId, cursosLista = null) => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        Promise.all([
            fetch(`/api/cursos/${cursoId}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                credentials: 'same-origin'
            }).then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            }),
            fetch('/api/categorias', {
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                credentials: 'same-origin'
            }).then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
        ])
            .then(([cursoData, categoriasData]) => {
                const curso = cursoData.curso || cursoData;
                const categorias = Array.isArray(categoriasData) ? categoriasData : (categoriasData.categorias || []);

                setCurso(curso);
                setCategorias(categorias);

                setData({
                    nome: curso.nome || "",
                    descricao: curso.descricao || "",
                    area: curso.area || "",
                    duracao: curso.duracao || "",
                    nivel: curso.nivel || "",
                    imagem: null,
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
                alert(`Erro ao carregar dados do curso: ${error.message}`);
                setLoading(false);
            });
    };

    const handleSelectCurso = (cursoId) => {
        setSelectedCourseId(cursoId);
        carregarCursoParaEdicao(cursoId);
    };

    const submit = (e) => {
        e.preventDefault();

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        console.log('CSRF Token:', token);
        console.log('Selected Course ID:', selectedCourseId);

        const formData = new FormData();

        formData.append('_token', token);

        formData.append('nome', data.nome);
        formData.append('descricao', data.descricao);
        formData.append('area', data.area);
        formData.append('duracao', data.duracao);
        formData.append('nivel', data.nivel);
        if (data.imagem) {
            formData.append('imagem', data.imagem);
        }

        fetch(`/editar-curso/${selectedCourseId}`, {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        })
            .then(res => {
                console.log('Response status:', res.status);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                alert('Curso atualizado com sucesso!');
                setCurso(null);
                setSelectedCourseId(null);
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(`Erro ao atualizar: ${error.message}`);
            });
    };
    const eliminar = () => {
        if (!window.confirm('Tem a certeza que deseja eliminar este curso?')) return;

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        fetch(`/api/cursos/${selectedCourseId}`, {
            method: 'DELETE',
            credentials: 'same-origin',
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
                alert('Curso eliminado com sucesso!');
                setCurso(null);
                setSelectedCourseId(null);
                fetch('/api/cursos/meus-cursos', {
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                })
                    .then(res => res.json())
                    .then(data => {
                        const cursosArray = Array.isArray(data) ? data : (data.cursos || []);
                        setCursos(cursosArray);
                    });
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(`Erro ao eliminar: ${error.message}`);
            });
    };

    if (loading) {
        return (
            <MainLayout user={auth.user}>
                <Head title="Editar Curso" />
                <div className="edit-course-container">
                    <div className="loading-spinner">
                        <svg className="spinner" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p>A carregar cursos...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (erro) {
        return (
            <MainLayout user={auth.user}>
                <Head title="Editar Curso" />
                <div className="edit-course-container">
                    <div className="edit-course-header">
                        <h1 className="edit-course-title">Erro</h1>
                    </div>
                    <div className="no-courses" style={{ color: '#EF4444' }}>
                        <p>{erro}</p>
                        <button
                            onClick={() => router.visit('/dashboard')}
                            className="btn-primary"
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }
    if (!selectedCourseId || !curso) {
        return (
            <MainLayout user={auth.user}>
                <Head title="Editar Curso" />
                <div className="edit-course-container">
                    <div className="edit-course-header">
                        <h1 className="edit-course-title">Editar Curso</h1>
                        <p className="edit-course-subtitle">
                            Selecione um curso para editar
                        </p>
                    </div>

                    {cursos.length === 0 ? (
                        <div className="no-courses">
                            <p>Você não tem cursos disponíveis para editar.</p>
                            <button
                                onClick={() => router.visit(route('CreateCourse'))}
                                className="btn-primary"
                            >
                                Criar Novo Curso
                            </button>
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {cursos.map((c) => (
                                <div
                                    key={c.id}
                                    className="course-card"
                                    onClick={() => handleSelectCurso(c.id)}
                                >
                                    {c.imagem_curso && (
                                        <img
                                            src={`/storage/${c.imagem_curso}`}
                                            alt={c.nome}
                                            className="course-card-image"
                                        />
                                    )}
                                    <div className="course-card-content">
                                        <h3 className="course-card-title">{c.nome}</h3>
                                        <p className="course-card-level">{c.nivel}</p>
                                        <p className="course-card-duration">{c.duracao}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout user={auth.user}>
            <Head title="Editar Curso" />

            <div className="edit-course-container">
                <div className="edit-course-header">
                    <h1 className="edit-course-title">Editar Curso</h1>
                    <p className="edit-course-subtitle">
                        Atualize as informações do curso
                    </p>
                </div>

                <form onSubmit={submit} className="edit-course-form">
                    {curso?.imagem_curso && !data.imagem && (
                        <div className="current-image-preview">
                            <p className="preview-label">Imagem Atual:</p>
                            <img
                                src={`/storage/${curso.imagem_curso}`}
                                alt={curso.nome}
                                className="current-image"
                            />
                        </div>
                    )}

                    <div className="form-image-upload">
                        <label htmlFor="imagem" className="image-upload-label">
                            {data.imagem ? (
                                <div className="image-preview">
                                    <img
                                        src={URL.createObjectURL(data.imagem)}
                                        alt="Nova imagem"
                                        className="preview-img"
                                    />
                                    <div className="image-overlay">
                                        <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p>Clique para alterar</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="upload-text">Carregar Nova Imagem (Opcional)</p>
                                    <p className="upload-hint">PNG, JPG até 5MB</p>
                                </div>
                            )}
                        </label>
                        <input
                            id="imagem"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData("imagem", e.target.files[0])}
                            className="hidden-input"
                        />
                        {errors.imagem && <span className="error-message">{errors.imagem}</span>}
                    </div>

                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label htmlFor="nome" className="form-label">
                                Nome do Curso *
                            </label>
                            <input
                                id="nome"
                                type="text"
                                value={data.nome}
                                onChange={(e) => setData("nome", e.target.value)}
                                className="form-input"
                                placeholder="Ex: Laravel Avançado"
                                required
                            />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="descricao" className="form-label">
                                Descrição
                            </label>
                            <textarea
                                id="descricao"
                                value={data.descricao}
                                onChange={(e) => setData("descricao", e.target.value)}
                                className="form-textarea"
                                placeholder="Descreva o conteúdo e objetivos do curso..."
                                rows="4"
                            />
                            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="area" className="form-label">
                                Categoria *
                            </label>
                            <select
                                id="area"
                                value={data.area}
                                onChange={(e) => setData("area", e.target.value)}
                                className="form-select"
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.area && <span className="error-message">{errors.area}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="nivel" className="form-label">
                                Nível *
                            </label>
                            <select
                                id="nivel"
                                value={data.nivel}
                                onChange={(e) => setData("nivel", e.target.value)}
                                className="form-select"
                                required
                            >
                                <option value="">Selecione um nível</option>
                                <option value="iniciante">Iniciante</option>
                                <option value="intermedio">Intermédio</option>
                                <option value="avancado">Avançado</option>
                            </select>
                            {errors.nivel && <span className="error-message">{errors.nivel}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="duracao" className="form-label">
                                Duração *
                            </label>
                            <input
                                id="duracao"
                                type="text"
                                value={data.duracao}
                                onChange={(e) => setData("duracao", e.target.value)}
                                className="form-input"
                                placeholder="Ex: 40 horas"
                                required
                            />
                            {errors.duracao && <span className="error-message">{errors.duracao}</span>}
                        </div>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => {
                                setCurso(null);
                                setSelectedCourseId(null);
                            }}
                            className="btn-secondary"
                        >
                            Voltar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary"
                        >

                            {processing ? (
                                <>
                                    <svg className="spinner-small" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    A atualizar...
                                </>
                            ) : (
                                <>
                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Atualizar Curso
                                </>


                            )}

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
            </div>
        </MainLayout>
    );
}

// Resumo: Lista cursos do utilizador, permite editar dados, imagem e eliminar.
// React: useState/useEffect para carregar dados, useForm para editar.
