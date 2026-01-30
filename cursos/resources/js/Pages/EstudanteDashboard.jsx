import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import "./EstudanteDashboard.css";

export default function EstudanteDashboard({ auth }) {
    return (
        //dashboard estudante autenticado com user
        <AuthenticatedLayout>
            <Head title="Aluno Dashboard" />

            <div className="topbar">
                <div className="topbar-left">
                    <span className="logo">MIRAI</span>
                    <span className="welcome">
                        ALUNO DASHBOARD | Bem vindo(a),{" "}
                        <span className="highlight">{auth?.user?.name}</span>
                    </span>
                </div>

                <ul className="topbar-right">
                    {/* notificacoes*/}
                    <li>
                        <Link href="/notificacoes">NOTIFICAÇÕES</Link>
                    </li>
                    <li className="divider"></li>

                    {/* conteudos */}
                    <li>
                        <Link href="/conteudos">CONTEÚDOS</Link>
                    </li>
                    <li className="divider"></li>

                    {/* cursos disponiveis*/}
                    <li>
                        <Link href="/cursos">CURSOS</Link>
                    </li>
                    <li className="divider"></li>

                    {/* perfil user */}
                    <li className="perfil">
                        <Link href="/profile">PERFIL</Link>
                    </li>

                    {/* logout */}
                    <li className="logout">
                        <Link href="/logout" method="post" as="button">
                            LOG OUT
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="estudante-wrapper">
                {/* barra lateral */}
                <div className="sidebar">
                    <h2 className="sidebar-title">MENU</h2>
                    <ul className="sidebar-list">
                        {/* progresso atual*/}
                        <li>
                            <Link href="/progresso">Progresso</Link>
                        </li>

                        {/* subscricoes efetuadas */}
                        <li>
                            <Link href="/subscrever">Subscrições</Link>
                        </li>
                    </ul>
                </div>

                {/* dashboard de view geral */}
                <div className="main-content">
                    <div className="estudante-container">
                        <div className="card dashboard-header-card">
                            <h3 className="card-title">DASHBOARD GERAL</h3>
                            <p className="dashboard-subtitle">ESCOLHA UM MENU PARA MAIS INFORMAÇÕES</p>
                        </div>

                        {/* pic */}
                        <div className="card student-avatar-card">
                            <img
                                src="/images/Footer.svg"
                                alt="Foto do estudante"
                                className="student-avatar"
                            />
                        </div>

                        {/* cards de tarefas e contactos */}
                        <div className="card">
                            <h3 className="card-title">
                                Últimas Tarefas <br />
                                <Link href="/notificacoes">ver mais</Link>
                            </h3>

                            <div className="tasks-grid">
                                <div className="task-card">
                                    <h4 className="task-title">SUBSCRIÇÃO EFETUADA</h4>
                                    <p className="task-text">
                                        Conteúdo subscrito e disponível para visualização
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Responsável:</span> Admin
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Categoria:</span> React.js
                                    </p>
                                    <p className="task-time">Há 1 hora</p>
                                </div>

                                <div className="task-card">
                                    <h4 className="task-title ">SUBSCRIÇÃO EFETUADA</h4>
                                    <p className="task-text">
                                        Conteúdo subscrito e disponível para visualização
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Responsável:</span> Admin
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Categoria:</span> Java
                                    </p>
                                    <p className="task-time">Há 2 dias</p>
                                </div>
                            </div>
                        </div>

                        {/* // footer  */}
                        <div className="card">
                            <h3 className="card-title">Contactos</h3>

                            <ul className="contacts-list">
                                <li>
                                    <strong>Email:</strong> hello@mirai.com
                                </li>
                                <li>
                                    <strong>Instagram:</strong> @mirai.cesae
                                </li>
                                <li>
                                    <strong>Facebook:</strong> MiraiCesae
                                </li>
                                <li>
                                    <strong>Morada:</strong> R. de Fundões 151, 3700-121 São João da Madeira
                                </li>
                                <li>
                                    <strong>Telefone:</strong> (+351) 256 123 456
                                </li>
                            </ul>

                            <p className="footer-text">Mirai © 2026 Cesae Digital</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
