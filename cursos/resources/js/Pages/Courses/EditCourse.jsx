import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function EditCourse() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Curso{" "}
                </h2>
            }
        >
            <Head title="Editar Curso" />
            <div>Editar um curso</div>
        </MainLayout>
    );
}
