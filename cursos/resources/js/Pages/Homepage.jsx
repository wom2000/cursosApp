import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import InfiniteScrollCategories from "@/Components/InfiniteScrollCategories";
import CarouselBanner from '@/Components/CarouselBanner';
import '../../css/Homepage.css'

export default function Homepage({ auth, cursosDestaque, categorias }) {
    const Layout = auth.user ? MainLayout : GuestLayout;
    return (
        <Layout>
            <div>
                <CarouselBanner/>
            </div>

            <div className="categories-section">
                <div className="categories-container">
                    <h2 className="section-title">
                        Explora as Nossas Áreas
                    </h2>
                </div>
                {categorias && categorias.length > 0 ? (
                    <InfiniteScrollCategories categorias={categorias} />
                ) : (
                    <div className="no-categories">
                        <p className="no-categories-text">
                            Nenhuma categoria disponível no momento.
                        </p>
                        {auth.user?.role === 'admin' && (
                            <Link
                                href={route('categorias.create')}
                                className="create-category-button"
                            >
                                Criar Primeira Categoria
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <div className="skills-section">
                <div className="skills-container">
                    <h2 className="section-title">
                        Eleva as Tuas Skills de Programação
                    </h2>

                    <div className="skills-block">
                        <div className="skills-image-left">
                            <div className="image-placeholder gradient-cyan">
                                <svg className="icon-large" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="skills-content-right">
                            <h3 className="skills-title">
                                Laravel + Filament
                            </h3>
                            <p className="skills-description">
                                Train like an athlete with top-tier equipment and expert programming. Whether you're building mass, dropping fat, or just want to push past limits.
                            </p>
                            <div>
                                <Link href={route('cursos.index')} className="skills-link">
                                    <span className="skills-link-text">VER MAIS</span>
                                    <svg className="skills-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bloco 2 - Imagem Direita */}
                    <div className="skills-block">
                        <div className="skills-content-left">
                            <h3 className="skills-title">
                                React.js Avançado
                            </h3>
                            <p className="skills-description">
                                Train like an athlete with top-tier equipment and expert programming. Whether you're building mass, dropping fat, or just want to push past limits.
                            </p>
                            <div>
                                <Link href={route('cursos.index')} className="skills-link">
                                    <span className="skills-link-text">VER MAIS</span>
                                    <svg className="skills-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="skills-image-right">
                            <div className="image-placeholder gradient-purple">
                                <svg className="icon-large" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
