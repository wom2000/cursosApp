import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import "../../../css/ShowCourse.css";

export default function ShowCourse({ auth, course }) {
    const materials = course?.materials ?? [];

    return (
        <MainLayout
            user={auth?.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Curso: {course?.title}
                </h2>
            }
        >
            <Head title={course?.title ?? "Curso"} />

            <div className="course-page">

                {/* Foto do curso */}
                <div className="course-cover">
                    <img src={course?.image} alt={course?.title} />
                </div>

                {/* Resumo */}
                <div className="course-summary">
                    <h3>Resumo do Curso</h3>
                    <p>{course?.description}</p>
                </div>

                {/* Materiais */}
                <div className="course-materials">
                    <h3>Materiais Disponíveis</h3>

                    {materials.length === 0 && (
                        <p className="no-materials">Nenhum material disponível.</p>
                    )}

                    <ul>
                        {materials.map((m) => (
                            <li key={m.id} className="material-card">
                                <div className="material-info">
                                    <img src={m.thumbnail} alt={m.name} />
                                    <div>
                                        <p className="material-title">{m.name}</p>
                                        <p className="material-desc">{m.description}</p>
                                    </div>
                                </div>

                                <a
                                    href={m.download_url}
                                    className="material-download"
                                    target="_blank"
                                >
                                    Download
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </MainLayout>
    );
}
