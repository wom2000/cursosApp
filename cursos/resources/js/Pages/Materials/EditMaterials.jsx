import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function EditMaterials() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Materiais{" "}
                </h2>
            }
        >
            <Head title="Editar Materiais" />
            <div>Editar um material</div>
        </MainLayout>
    );
}
