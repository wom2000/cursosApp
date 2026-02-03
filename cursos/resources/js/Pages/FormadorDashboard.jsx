import MainLayout from "@/Layouts/MainLayout";
import DashboardCard from "@/Components/DashboardCard";
import { Head } from "@inertiajs/react";
import "../../css/FormadorDashboard.css";

export default function FormadorDashboard({ auth, pendingApprovals }) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Dashboard Formador" />

            <div className="formador-dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Painel do Formador</h1>
                    <p className="dashboard-subtitle">
                        Crie cursos, carregue e aprove materiais...
                    </p>
                </div>

                <div className="dashboard-cards-grid">
                    <DashboardCard
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        }
                        title="Criar Curso"
                        description="Crie um novo curso e adicione conteúdos."
                        href={route("CreateCourse")}
                    />

                    <DashboardCard
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        }
                        title="Atualizar Curso"
                        description="Edite informações, adicione materiais e atualize o conteúdo dos seus cursos."
                        href={route("formador.courses")}
                    />

                    <DashboardCard
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
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        }
                        title="Carregar Materiais"
                        description="Faça upload de vídeos, PDFs, exercícios e outros recursos para os seus cursos."
                        href={route("UploadMaterials")}
                    />

                    <DashboardCard
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
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        }
                        title="Aprovar Materiais"
                        description="Aprove materiais enviados pelos alunos deste curso."
                        href={route("formador.approve-materials")}
                        badge={pendingApprovals > 0 ? pendingApprovals : null}
                    />
                    {/*
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        }
                        title="Estatísticas"
                        description="Acesse relatórios e analytics sobre o desempenho dos seus cursos."
                        href={route('estatisticas.index')}
                    /> */}
                </div>
            </div>
        </MainLayout>
    );
}
