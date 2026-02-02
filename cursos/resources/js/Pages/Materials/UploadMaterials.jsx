import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import '../../../css/UploadMaterial.css'

export default function UploadMaterials() {
    const { auth } = usePage().props;
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        id_curso: "",
        ficheiro: null,
    });

    // Buscar cursos disponíveis
    useEffect(() => {
        fetch('/api/cursos', {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setCursos(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar cursos:', error);
                setLoading(false);
            });
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('materiais.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                alert('Material enviado com sucesso!');
            },
            onError: (errors) => {
                console.error('Erros:', errors);
            }
        });
    };

    const getFileIcon = () => {
        if (!data.ficheiro) return null;

        const ext = data.ficheiro.name.split('.').pop().toLowerCase();
        const icons = {
            pdf: '📄',
            mp4: '🎥',
            mp3: '🎵',
            jpg: '🖼️',
            png: '🖼️',
            docx: '📝'
        };
        return icons[ext] || '📎';
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Carregar Materiais" />

            <div className="upload-materials-container">
                <div className="upload-materials-header">
                    <h1 className="upload-materials-title">Carregar Material</h1>
                    <p className="upload-materials-subtitle">
                        Envie vídeos, PDFs, áudios ou documentos para seus cursos
                    </p>
                </div>

                <form onSubmit={submit} className="upload-materials-form">
                    {/* Upload de Ficheiro - Destaque */}
                    <div className="form-file-upload">
                        <label htmlFor="ficheiro" className="file-upload-label">
                            {data.ficheiro ? (
                                <div className="file-preview">
                                    <div className="file-icon-large">
                                        {getFileIcon()}
                                    </div>
                                    <div className="file-info">
                                        <p className="file-name">{data.ficheiro.name}</p>
                                        <p className="file-size">
                                            {(data.ficheiro.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData('ficheiro', null)}
                                        className="file-remove-btn"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="upload-text">Arraste o ficheiro ou clique para selecionar</p>
                                    <p className="upload-hint">
                                        Formatos aceites: MP3, MP4, PDF, JPG, PNG, DOCX (máx. 50MB)
                                    </p>
                                </div>
                            )}
                        </label>
                        <input
                            id="ficheiro"
                            type="file"
                            accept=".mp3,.mp4,.pdf,.jpg,.png,.docx"
                            onChange={(e) => setData("ficheiro", e.target.files[0])}
                            className="hidden-input"
                            required
                        />
                        {errors.ficheiro && <span className="error-message">{errors.ficheiro}</span>}
                    </div>

                    {/* Campos do Formulário */}
                    <div className="form-fields">
                        {/* Nome do Material */}
                        <div className="form-group">
                            <label htmlFor="nome" className="form-label">
                                Nome do Material *
                            </label>
                            <input
                                id="nome"
                                type="text"
                                value={data.nome}
                                onChange={(e) => setData("nome", e.target.value)}
                                className="form-input"
                                placeholder="Ex: Aula 1 - Introdução ao Laravel"
                                required
                            />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>

                        {/* Curso */}
                        <div className="form-group">
                            <label htmlFor="id_curso" className="form-label">
                                Curso *
                            </label>
                            {loading ? (
                                <div className="form-loading">A carregar cursos...</div>
                            ) : (
                                <select
                                    id="id_curso"
                                    value={data.id_curso}
                                    onChange={(e) => setData("id_curso", e.target.value)}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Selecione um curso</option>
                                    {cursos.map((curso) => (
                                        <option key={curso.id} value={curso.id}>
                                            {curso.nome}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {errors.id_curso && <span className="error-message">{errors.id_curso}</span>}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="info-box">
                        <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="info-title">Aprovação de Materiais</p>
                            <p className="info-text">
                                {auth.user.role === 'formador' || auth.user.role === 'admin'
                                    ? 'Os seus materiais serão aprovados automaticamente.'
                                    : 'Os materiais enviados precisam de aprovação do formador antes de ficarem visíveis.'}
                            </p>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !data.ficheiro}
                            className="btn-primary"
                        >
                            {processing ? (
                                <>
                                    <svg className="spinner" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    A enviar...
                                </>
                            ) : (
                                <>
                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Enviar Material
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
