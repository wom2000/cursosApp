import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function ManageSubscription({ id }) {
    const isManaging = Boolean(id);

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isManaging ? "Gerir Subscrição" : "Progresso das Subscrições"}
                </h2>
            }
        >
            <Head title={isManaging ? "Gerir Subscrição" : "Progresso"} />

            <div className="p-6 text-gray-700">
                {isManaging ? (
                    <div>
                        <p className="mb-4">
                            Estás a gerir a subscrição com ID: <strong>{id}</strong>
                        </p>

                        <p>
                            Aqui no futuro vais poder alterar estado, cancelar, renovar,
                            ver detalhes, etc.
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4">
                            Aqui vais ver o progresso geral das tuas subscrições.
                        </p>

                        <p>
                            No futuro podemos mostrar percentagens, módulos concluídos,
                            estado das formações, etc.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
