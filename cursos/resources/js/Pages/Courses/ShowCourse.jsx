import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import "../../../css/ShowCourse.css";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShowCourse({ auth, id }) {
    const { props } = usePage();
    const routeId =
        id ||
        props?.id ||
        window.location.pathname.split("/").pop();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!routeId) {
            setError("ID do curso não fornecido");
            setLoading(false);
            return;
        }

        let mounted = true;

        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await axios.get(`/api/cursos/${routeId}`);
                const data = response.data?.curso ?? response.data ?? null;

                console.log('Dados recebidos:', data);

                if (mounted) {
                    setCourse(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Erro ao carregar:', err);
                if (mounted) {
                    setError("Não foi possível carregar o curso.");
                    setLoading(false);
                }
            }
        };

        fetchCourse();

        return () => {
            mounted = false;
        };
    }, [routeId]);

    const title = course?.nome || "Curso";
    const description = course?.descricao || "Sem descrição.";
    const image = course?.imagem_curso
        ? `/storage/${course.imagem_curso}`
        : "/images/imagensCursos/placeholder.png";
    const category = course?.categoria?.nome || "—";
    const level = course?.nivel || "—";
    const duration = course?.duracao || "—";
    const instructor = course?.formador?.name || "—";

    return (
        <MainLayout user={auth?.user}>
            <Head title={title} />

            <div className="course-page">
                <div className="course-breadcrumb">
                    <Link href="/cursos">Cursos</Link>
                    <span>/</span>
                    <span>{title}</span>
                </div>
                {error && <p className="course-error">{error}</p>}
                {loading && (
                    <p className="course-loading">A carregar curso...</p>
                )}
                {!loading && !error && course && (
                    <>
                        <div className="course-hero">
                            <div className="course-hero-text">
                                <p className="course-pretitle">Curso</p>
                                <h1 className="course-title">{title}</h1>
                                <p className="course-description">
                                    {description}
                                </p>
                                <div className="course-actions">
                                    <Link href={`/curso/${routeId}/materiais`}>
                                        <PrimaryButton>
                                            Ver Materiais
                                        </PrimaryButton>
                                    </Link>
                                    <Link href={`/carregar-conteudo?curso=${routeId}`}>
                                        <PrimaryButton>
                                            Carregar Materiais
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            </div>
                            <div className="course-hero-media">
                                <img src={image} alt={title} />
                            </div>
                        </div>
                        <div className="course-info-grid">
                            <div className="course-info-card">
                                <span className="course-info-label">
                                    Categoria
                                </span>
                                <strong className="course-info-value">
                                    {category}
                                </strong>
                            </div>
                            <div className="course-info-card">
                                <span className="course-info-label">Nível</span>
                                <strong className="course-info-value">
                                    {level}
                                </strong>
                            </div>
                            <div className="course-info-card">
                                <span className="course-info-label">
                                    Duração
                                </span>
                                <strong className="course-info-value">
                                    {duration}
                                </strong>
                            </div>
                            <div className="course-info-card">
                                <span className="course-info-label">
                                    Formador
                                </span>
                                <strong className="course-info-value">
                                    {instructor}
                                </strong>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
