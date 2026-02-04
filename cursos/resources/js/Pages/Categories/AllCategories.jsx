import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import GuestLayout from "@/Layouts/GuestLayout";
import MainLayout from "@/Layouts/MainLayout";
import CategoriaCard from "@/Components/CategoriaCard";
import "../../../css/Categorias.css";

export default function AllCategories({ auth }) {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const Layout = auth.user ? MainLayout : GuestLayout;

    useEffect(() => {
        fetchCategorias(currentPage);
    }, [currentPage]);

    const fetchCategorias = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/categorias?page=${page}`);
            const categoriasArray = response.data.data ?? response.data ?? [];

            setCategorias(categoriasArray);
            setCurrentPage(response.data.current_page ?? 1);
            setLastPage(response.data.last_page ?? 1);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            setCategorias([]);
            setCurrentPage(1);
            setLastPage(1);
        } finally {
            setLoading(false);
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    return (
        <Layout>
            <Head title="Categorias" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="all-categories-container">
                        <h2 className="all-categories-title">
                            Todas as Categorias
                        </h2>

                        {loading ? (
                            <p>A carregar categorias...</p>
                        ) : (
                            <>
                                {categorias.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-lg">
                                            Nenhuma categoria encontrada.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categorias.map((categoria) => (
                                            <CategoriaCard
                                                key={categoria.id}
                                                icon={
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                        />
                                                    </svg>
                                                }
                                                title={categoria.nome}
                                                description={
                                                    categoria.descricao ||
                                                    "Sem descrição"
                                                }
                                                href={`/cursos?area=${categoria.id}`}
                                            ></CategoriaCard>
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
                                                className={`navegacao-paginas ${currentPage === i + 1
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
            </div>
        </Layout>
    );
}
