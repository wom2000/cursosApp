import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function AllMaterials() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Materiais{" "}
                </h2>
            }
        >
            <Head title="Materiais" />
            <div>Aqui estão os materiais</div>
        </MainLayout>
    );
}
