import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function UploadMaterials() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Carregar Materiais{" "}
                </h2>
            }
        >
            <Head title="Carregar Materiais" />
            <div>Aqui carrega os materiais</div>
        </MainLayout>
    );
}
