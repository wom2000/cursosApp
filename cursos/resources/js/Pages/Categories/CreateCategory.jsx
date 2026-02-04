<<<<<<< angeloBranch
import MainLayout from "@/Layouts/MainLayout";
=======
 import MainLayout from "@/Layouts/MainLayout";
>>>>>>> main
import { Head, useForm, usePage } from "@inertiajs/react";
import "../../../css/CreateCourse.css";

export default function CreateCategory() {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        descricao: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("categorias.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Criar Categoria" />

            <div className="create-course-container">
                <div className="create-course-header">
                    <h1 className="create-course-title">Criar Nova Categoria</h1>
                    <p className="create-course-subtitle">
                        Preencha os detalhes da categoria abaixo
                    </p>
                </div>

                <form onSubmit={submit} className="create-course-form">
<<<<<<< angeloBranch
                    {/* Grid de Campos */}
                    <div className="form-grid">
                        {/* Nome da Categoria */}
=======
                    <div className="form-grid">

>>>>>>> main
                        <div className="form-group full-width">
                            <label htmlFor="nome" className="form-label">
                                Nome da Categoria *
                            </label>
                            <input
                                id="nome"
                                type="text"
                                value={data.nome}
                                onChange={(e) => setData("nome", e.target.value)}
                                className="form-input"
                                placeholder="Ex: Desenvolvimento Web"
                                required
                            />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>
<<<<<<< angeloBranch

                        {/* Descrição */}
=======
>>>>>>> main
                        <div className="form-group full-width">
                            <label htmlFor="descricao" className="form-label">
                                Descrição
                            </label>
                            <textarea
                                id="descricao"
                                value={data.descricao}
                                onChange={(e) => setData("descricao", e.target.value)}
                                className="form-textarea"
                                placeholder="Descreva o tema e conteúdo desta categoria..."
                                rows="4"
                            />
                            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
                        </div>
                    </div>
<<<<<<< angeloBranch

                    {/* Botões */}
=======
>>>>>>> main
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
                                    Criar Categoria
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

// Resumo: Formulario simples para criar categorias com nome e descricao.
// React: useForm para estado do formulario e envio, usePage para props.
