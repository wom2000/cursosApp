import { useState } from "react";
import { router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function CreateCategory({ auth }) {
    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post("/categorias", { nome }, {
            onSuccess: () => {
                setMensagem("Categoria criada com sucesso.");
                setNome("");
            },
            onError: () => {
                setMensagem("Erro ao criar categoria.");
            },
        });
    };

    return (
        <MainLayout user={auth.user}>
            <div className="create-category-container">
                <h1 className="create-category-title">Criar Categoria</h1>

                <form onSubmit={handleSubmit} className="create-category-form">
                    <label htmlFor="nome" className="create-category-label">
                        Nome da Categoria
                    </label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="create-category-input"
                        required
                    />

                    <button type="submit" className="create-category-button">
                        Criar
                    </button>

                    {mensagem && (
                        <p className="create-category-message">{mensagem}</p>
                    )}
                </form>
            </div>
        </MainLayout>
    );
}
