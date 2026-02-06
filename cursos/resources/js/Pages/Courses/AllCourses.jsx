import GuestLayout from "@/Layouts/GuestLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/courses.css";

export default function AllCourses({ auth }) {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { categorias = [] } = usePage().props;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const area = params.get("area");

        if (area) {
            setSelectedCategory(Number(area));
            fetchCursos(currentPage, Number(area));
        } else {
            fetchCursos(currentPage);
        }
    }, [currentPage]);

    const fetchCursos = async (page = 1, area = selectedCategory) => {
        try {
            setLoading(true);
            const areaParam = area ? `&area=${area}` : "";

            const response = await axios.get(
                `/api/cursos?page=${page}${areaParam}`,
            );
            const cursosArray = response.data.data;
            setCursos(cursosArray);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
            setCursos([]);
        } finally {
            setLoading(false);
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const handleSelectCategory = (id) => {
        setSelectedCategory(id);
        setCurrentPage(1);
        fetchCursos(1, id);
    };

    const Layout = auth.user ? MainLayout : GuestLayout;

    return (
        <Layout>
            <Head title="Cursos" />
            <div className="categories-container">
                <button
                    onClick={() => handleSelectCategory(null)}
                    className={`cursos-button secondary-button ${selectedCategory === null ? "active-secondary-button" : ""}`}
                >
                    Todos
                </button>
                {categorias && categorias.length > 0 ? (
                    categorias.map((categoria) => (
                        <button
                            className={`cursos-button secondary-button ${selectedCategory === categoria.id ? "active-secondary-button" : ""}`}
                            key={categoria.id}
                            onClick={() => handleSelectCategory(categoria.id)}
                        >
                            {categoria.nome}
                        </button>
                    ))
                ) : (
                    <p> Nenhuma categoria encontrada</p>
                )}
            </div>
            <div className="all-courses-container">
                <h2 className="all-courses-title">OS NOSSOS CURSOS</h2>
                <div className="courses-cards-container">
                    {loading ? (
                        <p>A carregar cursos...</p>
                    ) : (
                        <>
                            {cursos.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        Nenhum curso encontrado.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {cursos.map((curso) => (
                                        <div
                                            key={curso.id}
                                            className="course-card"
                                            style={{
                                                backgroundImage: `url(${
                                                    curso.imagem_curso
                                                        ? curso.imagem_curso.startsWith(
                                                              "images/",
                                                          )
                                                            ? `/${curso.imagem_curso}`
                                                            : `/storage/${curso.imagem_curso}`
                                                        : "/images/imagensCursos/placeholder.png"
                                                })`,
                                            }}
                                        >
                                            <h3 className="course-card-title">
                                                {curso.nome}
                                            </h3>

                                            <p className="course-card-description">
                                                {curso.descricao ||
                                                    "Sem descrição"}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span
                                                    className={`tag-nivel ${
                                                        curso.nivel ===
                                                        "iniciante"
                                                            ? "tag-nivel-iniciante"
                                                            : curso.nivel ===
                                                                "intermedio"
                                                              ? "tag-nivel-intermedio"
                                                              : "tag-nivel-avancado"
                                                    }`}
                                                >
                                                    {curso.nivel ===
                                                    "iniciante" ? (
                                                        <span>Iniciante</span>
                                                    ) : curso.nivel ===
                                                      "intermedio" ? (
                                                        <span>Intermédio</span>
                                                    ) : (
                                                        <span>Avançado</span>
                                                    )}
                                                </span>

                                                {curso.duracao && (
                                                    <span className="tag-duracao">
                                                        {curso.duracao}
                                                    </span>
                                                )}

                                                {curso.materiais_count !==
                                                    undefined && (
                                                    <span className="tag-materiais">
                                                        {curso.materiais_count}{" "}
                                                        materiais
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                href={`/curso/${curso.id}`}
                                                className="primary-button"
                                            >
                                                Ver Detalhes
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {lastPage > 1 && (
                                <div className="flex justify-center mt-6 gap-2">
                                    <button
                                        onClick={() =>
                                            goToPage(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="navegacao-paginas"
                                    >
                                        &lt; Anterior
                                    </button>

                                    {[...Array(lastPage)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => goToPage(i + 1)}
                                            className={`navegacao-paginas ${
                                                currentPage === i + 1
                                                    ? "navegacao-paginas-ativo"
                                                    : ""
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() =>
                                            goToPage(currentPage + 1)
                                        }
                                        disabled={currentPage === lastPage}
                                        className="navegacao-paginas"
                                    >
                                        Próximo &gt;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

// React: useState/useEffect para lista e paginacao, usePage para props.
