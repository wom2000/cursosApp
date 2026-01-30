import MainLayout from "@/Layouts/MainLayout";
import DashboardCard from "@/Components/DashboardCard";
import { Head, Link } from "@inertiajs/react";
import "../../css/EstudanteDashboard.css";

export default function EstudanteDashboard({ auth }) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Dashboard Estudante" />

            <div className="estudante-dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Painel do Estudante</h1>
                    <p className="dashboard-subtitle">
                        Veja os cursos disponíveis, acompanhe o seu progresso e aceda aos seus conteúdos.
                    </p>
                </div>

                <div className="dashboard-cards-grid">

                    {/* card cursos */}
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                            </svg>
                        }
                        title="Cursos Disponíveis"
                        description="Veja todos os cursos que pode frequentar."
                        href="/cursos"
                    />

                    {/* card subs */}
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        }
                        title="Subscrições"
                        description="Aceda aos conteúdos que subscreveu."
                        href="/subscrever"
                    />

                    {/* card progresso */}
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
                            </svg>
                        }
                        title="Progresso"
                        description="Veja o seu progresso nos cursos."
                        href="/progresso"
                    />

                    {/* card notificacoes */}
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        }
                        title="Notificações"
                        description="Veja as suas últimas atualizações."
                        href="/notificacoes"
                    />

                    {/* card inserir conteudo — AGORA DENTRO DA GRID */}
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v8m0-8l-3 3m3-3l3 3M4 4h16v8H4z"
                                />
                            </svg>
                        }
                        title="Carregar Conteúdos"
                        description="Envie vídeos, PDFs e materiais para os seus cursos."
                        href={route("UploadMaterials")}
                    />

                </div>
            </div>
        </MainLayout>
    );
}
