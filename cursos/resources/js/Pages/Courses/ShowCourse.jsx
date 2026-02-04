import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function ShowCourse({ auth, id }) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Curso" />
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Detalhes do Curso
                </h1>
                <p className="mt-2 text-gray-600">
                    Aceda aos materiais e registe o seu progresso.
                </p>

                <div className="mt-6">
                    <Link
                        href={`/curso/${id}/materiais`}
                        className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Ver Materiais
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
