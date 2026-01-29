import { Link } from "@inertiajs/react";
import "../../css/InfiniteScrollCategories.css";

export default function InfiniteScrollCategories({ categorias }) {
    // Duplicar categorias 3x para criar efeito infinito perfeito
    const duplicatedCategorias = [...categorias, ...categorias, ...categorias];

    return (
        <div className="infinite-scroll-container">
            {/* Container do scroll */}
            <div className="scroll-track">
                {duplicatedCategorias.map((categoria, index) => (
                    <Link
                        key={`${categoria.id}-${index}`}
                        href={route("cursos.index", { area: categoria.id })}
                        className="categoria-card"
                    >
                        <div className="card-content">
                            <div className="card-text">
                                <h3 className="card-title">{categoria.nome}</h3>
                                <p className="card-description">
                                    {categoria.descricao}
                                </p>
                            </div>

                            <div className="card-link">
                                <span>VER MAIS</span>
                                <svg
                                    className="arrow-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
