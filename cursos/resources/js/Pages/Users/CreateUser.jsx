import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import "../../../css/CreateCourse.css";

export default function CreateUser() {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "estudante",
        cesae_student: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Criar Utilizador" />

            <div className="create-course-container">
                <div className="create-course-header">
                    <h1 className="create-course-title">Criar Utilizador</h1>
                    <p className="create-course-subtitle">
                        Preencha os dados do utilizador abaixo
                    </p>
                </div>

                <form onSubmit={submit} className="create-course-form">
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label htmlFor="name" className="form-label">
                                Nome *
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="form-input"
                                placeholder="Ex: Pedro Silva"
                                required
                            />
                            {errors.name && (
                                <span className="error-message">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="email" className="form-label">
                                Email *
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="form-input"
                                placeholder="Ex: email@exemplo.com"
                                required
                            />
                            {errors.email && (
                                <span className="error-message">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Palavra-passe *
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="form-input"
                                required
                            />
                            {errors.password && (
                                <span className="error-message">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="password_confirmation"
                                className="form-label"
                            >
                                Confirmar palavra-passe *
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role" className="form-label">
                                Tipo *
                            </label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="form-select"
                                required
                            >
                                <option
                                    value="estudante"
                                    className="form-select-option"
                                >
                                    Estudante
                                </option>
                                <option
                                    value="formador"
                                    className="form-select-option"
                                >
                                    Formador
                                </option>
                                <option
                                    value="admin"
                                    className="form-select-option"
                                >
                                    Admin
                                </option>
                            </select>
                            {errors.role && (
                                <span className="error-message">
                                    {errors.role}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">CESAE</label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.cesae_student}
                                    onChange={(e) =>
                                        setData(
                                            "cesae_student",
                                            e.target.checked,
                                        )
                                    }
                                />
                                <span>É aluno CESAE</span>
                            </label>
                            {errors.cesae_student && (
                                <span className="error-message">
                                    {errors.cesae_student}
                                </span>
                            )}
                        </div>
                    </div>

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
                            {processing ? "A criar..." : "Criar Utilizador"}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

// Resumo: Formulario para criar utilizadores com papel e opcao CESAE.
// React: useForm para estado do formulario e envio, usePage para props.
