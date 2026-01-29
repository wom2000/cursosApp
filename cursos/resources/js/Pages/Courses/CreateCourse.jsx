import MainLayout from "@/Layouts/MainLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm, usePage } from "@inertiajs/react";
import "../../../css/CreateCourse.css";

export default function CreateCourse() {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        descricao: "",
        area: "",
        duracao: "",
        nivel: "",
        formadores: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("cursos.store"), {
            preserveScroll: true,
            onSuccess: () => reset,
        });
    };
    return (
        <MainLayout>
            <Head title="Criar Cursos" />
            <div className="overflow-hidden create-course-form-container">
                <form className="create-course-form" onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="nome"
                            value="Nome"
                            className="form-label"
                        />

                        <TextInput
                            id="nome"
                            name="nome"
                            value={data.nome}
                            className="mt-1 block w-full"
                            autoComplete="nome"
                            isFocused={true}
                            onChange={(e) => setData("nome", e.target.value)}
                            required
                        />

                        <InputError message={errors.nome} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="descricao"
                            value="Descrição"
                            className="form-label"
                        />

                        <TextInput
                            id="descricao"
                            type="text"
                            name="descricao"
                            value={data.descricao}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("descricao", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.descricao}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="area"
                            value="Área"
                            className="form-label"
                        />

                        <select
                            id="area"
                            value={data.area}
                            onChange={(e) => setData("area", e.target.value)}
                            className="mt-1 block w-full"
                            required
                        >
                            <option value="">Select a category</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.area} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="duracao"
                            value="Duração"
                            className="form-label"
                        />

                        <TextInput
                            id="duracao"
                            type="text"
                            name="duracao"
                            value={data.duracao}
                            className="mt-1 block w-full"
                            autoComplete="duracao"
                            onChange={(e) => setData("duracao", e.target.value)}
                            required
                        />

                        <InputError message={errors.duracao} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="nivel"
                            value="Nível"
                            className="form-label"
                        />

                        <select
                            id="nivel"
                            value={data.nivel}
                            onChange={(e) => setData("nivel", e.target.value)}
                            className="mt-1 block w-full"
                            required
                        >
                            <option value="">Select level</option>
                            <option value="iniciante">Iniciante</option>
                            <option value="intermedio">Intermédio</option>
                            <option value="avancado">Avançado</option>
                        </select>

                        <InputError message={errors.nivel} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="formadores"
                            value="Formadores"
                            className="form-label"
                        />
                        <TextInput
                            id="formadores"
                            type="number"
                            value={data.formadores}
                            onChange={(e) =>
                                setData("formadores", e.target.value)
                            }
                            className="mt-1 block w-full"
                            required
                        />

                        <InputError
                            message={errors.formadores}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Inserir Curso
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
