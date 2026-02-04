import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import InfiniteScrollCategories from "@/Components/InfiniteScrollCategories";
import CarouselBanner from "@/Components/CarouselBanner";
import SkillCard from "@/Components/SkillsCard";
import CommunityCard from "@/Components/CommunityCard";
import PrimaryButton from "@/Components/PrimaryButton";
import "../../css/Homepage.css";

export default function Homepage({ auth, cursosDestaque, categorias }) {
    const Layout = auth.user ? MainLayout : GuestLayout;
    return (
        <Layout>
            <Head title="Homepage" />
            <div>
                <CarouselBanner />
            </div>
            <div className="categories-section">
                <div className="categories-container">
                    <h2 className="section-title">Explora as Nossas Áreas</h2>
                </div>
                {categorias && categorias.length > 0 ? (
                    <InfiniteScrollCategories categorias={categorias} />
                ) : (
                    <div className="no-categories">
                        <p className="no-categories-text">
                            Nenhuma categoria disponível no momento.
                        </p>
                        {auth.user?.role === "admin" && (
                            <Link
                                href={route("categorias.create")}
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

                    {cursosDestaque && cursosDestaque.length > 0 ? (
                        cursosDestaque
                            .slice(0, 2)
                            .map((curso, index) => (
                                <SkillCard
                                    key={curso.id}
                                    curso={curso}
                                    imagePosition={
                                        index % 2 === 0 ? "left" : "right"
                                    }
                                />
                            ))
                    ) : (
                        <div className="no-courses">
                            <p className="no-courses-text">
                                Nenhum curso disponível no momento.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="comunidade-section">
                <div className="comunidade-container">
                    <h2 className="section-title">Entra na comunidade mirai</h2>

                    <div className="community-button-wrapper">
                        <Link href="/subscrever">
                            <PrimaryButton>SUBSCREVE JÁ</PrimaryButton>
                        </Link>
                    </div>

                    <div className="community-cards-grid">
                        <CommunityCard
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
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            }
                            title="Certificados Reconhecidos"
                            description="A cada formação do curso concluída, ganhará um certificado validado pelas empresas do setor."
                        />

                        <CommunityCard
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
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            }
                            title="Acesso a todos os cursos"
                            description="Cursos, formações e conteúdos exclusivos que te vão ajudar a aprimorar as suas skills principais."
                        />

                        <CommunityCard
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
                            title="A melhor didática"
                            description="Desafios reais, projetos práticos e a melhor didática, recomendado por quem estuda connosco."
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
