import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import "../../../css/ShowCourse.css";
import PrimaryButton from '../../Components/PrimaryButton'

export default function ShowCourse({ auth, course }) {
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

                <div className="course-materials">
                    <Link
                        href={`/curso/${course?.id}/materiais`}
                    >
                        <PrimaryButton>Ver Materiais</PrimaryButton>
                    </Link>
                    <Link href={`/carregar-conteudo?curso=${course?.id}`}>
                        <PrimaryButton>Carregar Materiais</PrimaryButton>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
