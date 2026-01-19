import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function ShowCourse() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Curso{" "}
                </h2>
            }
        >
            <Head title="Curso" />
            <div>Isto é um curso</div>
        </MainLayout>
    );
}
