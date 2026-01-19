import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function CreateCourse() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Criar Curso{" "}
                </h2>
            }
        >
            <Head title="Criar Curso" />
            <div>Criar um curso</div>
        </MainLayout>
    );
}
