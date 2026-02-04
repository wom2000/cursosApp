import MainLayout from "@/Layouts/MainLayout";
import DashboardCard from "@/Components/DashboardCard";
import { Head } from "@inertiajs/react";
import "../../css/AdminDashboard.css";

export default function AdminDashboard({ auth }) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Dashboard Admin" />
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Painel do Administrador</h1>
                    <p className="dashboard-subtitle">
                        Faça a gestão dos utilizadores, cursos, materiais e subscrições da plataforma.
                    </p>
                </div>
                <div className="dashboard-cards-grid">
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H2v-2a4 4 0 014-4h1m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        }
                        title="Gerir Utilizadores"
                        description="Administre contas e permissões."
                        href="/admin/users"
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
                        title="Gerir Cursos"
                        description="Consulte e administre todos os cursos."
                        href="/editar-curso"
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        }
                        title="Criar Curso"
                        description="Adicione novos cursos à plataforma."
                        href={route("CreateCourse")}
                    />
                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 20l9-5-9-5-9 5 9 5z"
                                />
                            </svg>
                        }
                        title="Gerir Materiais"
                        description="Aceda a todos os materiais enviados."
                        href={route("PendingMaterials")}
                    />

                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        }
                        title="Gerir Categorias"
                        description="Veja todas as categorias disponíveis."
                        href="/editar-categoria"
                    />

                    <DashboardCard
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v12m6-6H6"
                                />
                            </svg>
                        }
                        title="Criar Categoria"
                        description="Adicione novas categorias à plataforma."
                        href="/criar-categoria"
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

                </div>
            </div>
        </MainLayout>


    );
}

// React: componente simples com props e sem estado local. só mostram cards e textos, sem fetch nem estado.
