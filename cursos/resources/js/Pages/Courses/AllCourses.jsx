import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function AllCourses() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Todos os cursos{" "}
                </h2>
            }
        >
            <Head title="Cursos" />
            <div>Todos os cursos</div>
        </MainLayout>
    );
}
