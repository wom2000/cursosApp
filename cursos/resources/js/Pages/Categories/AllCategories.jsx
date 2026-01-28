import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllCategories({ auth }) {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

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
        console.error('Erro ao buscar categorias:', error);
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categorias" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">📂 Todas as Categorias</h2>

                        {loading ? (
                            <p>A carregar categorias...</p>
                        ) : (
                            <>
                                {categorias.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">Nenhuma categoria encontrada.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categorias.map((categoria) => (
                                            <div
                                                key={categoria.id}
                                                className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                                            >
                                                <h3 className="font-bold text-xl mb-2">{categoria.nome}</h3>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {categoria.descricao || 'Sem descrição'}
                                                </p>

                                                <button
                                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                                >
                                                    Ver Cursos
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Paginação */}
                                {lastPage > 1 && (
                                    <div className="flex justify-center mt-6 gap-2">
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            &lt; Anterior
                                        </button>

                                        {[...Array(lastPage)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => goToPage(i + 1)}
                                                className={`px-3 py-1 border rounded ${
                                                    currentPage === i + 1 ? 'bg-blue-600 text-white' : ''
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === lastPage}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
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
        </AuthenticatedLayout>
    );
}
