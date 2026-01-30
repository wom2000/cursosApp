import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import "../../../css/CreateCourse.css";

export default function CreateCourse() {
    const { auth, categorias = [] } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        descricao: "",
        area: "",
        duracao: "",
        nivel: "",
        formadores: auth.user.id,
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("cursos.store"), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Criar Curso" />

            <div className="create-course-container">
                <div className="create-course-header">
                    <h1 className="create-course-title">Criar Novo Curso</h1>
                    <p className="create-course-subtitle">
                        Preencha os detalhes do curso abaixo
                    </p>
                </div>

                <form onSubmit={submit} className="create-course-form">
                    {/* Upload de Imagem - Destaque */}
                    <div className="form-image-upload">
                        <label htmlFor="imagem" className="image-upload-label">
                            {data.imagem ? (
                                <div className="image-preview">
                                    <img
                                        src={URL.createObjectURL(data.imagem)}
                                        alt="Preview"
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
                                    <p className="upload-text">Carregar Imagem do Curso</p>
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

                    {/* Grid de Campos */}
                    <div className="form-grid">
                        {/* Nome do Curso */}
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

                        {/* Descrição */}
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

                        {/* Categoria */}
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
                                {categorias && categorias.length > 0 ? (
                                    categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Nenhuma categoria encontrada</option>
                                )}
                            </select>
                            {errors.area && <span className="error-message">{errors.area}</span>}
                        </div>

                        {/* Nível */}
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

                        {/* Duração */}
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
      <div></div>
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
                            disabled={processing}
                            className="btn-primary"
                        >
                            {processing ? (
                                <>
                                    <svg className="spinner" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    A criar...
                                </>
                            ) : (
                                <>
                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Criar Curso
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
