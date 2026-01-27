import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllCourses({ auth }) {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchCursos(currentPage);
    }, [currentPage]);

    const fetchCursos = async (page = 1) => {
    try {
        setLoading(true);
        const response = await axios.get(`/api/cursos-publicos?page=${page}`); // rota pública
        const cursosArray = response.data.data;
        setCursos(cursosArray);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Cursos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">🎯 Todos os Cursos</h2>

                        {loading ? (
                            <p>A carregar cursos...</p>
                        ) : (
                            <>
                                {cursos.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">Nenhum curso encontrado.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {cursos.map((curso) => (
                                            <div
                                                key={curso.id}
                                                className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                                            >
                                                <h3 className="font-bold text-xl mb-2">{curso.nome}</h3>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {curso.descricao || 'Sem descrição'}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            curso.nivel === 'iniciante'
                                                                ? 'bg-green-100 text-green-800'
                                                                : curso.nivel === 'intermedio'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {curso.nivel}
                                                    </span>

                                                    {curso.duracao && (
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                            {curso.duracao}
                                                        </span>
                                                    )}

                                                    {curso.materiais_count !== undefined && (
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                                                            {curso.materiais_count} materiais
                                                        </span>
                                                    )}
                                                </div>

                                                <button
                                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                                >
                                                    Ver Detalhes
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
