import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "./AdminDashboard.css";

export default function AdminDashboard({ auth }) {
    // info do calendario
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.toLocaleString("pt-PT", { month: "long" });
    const anoAtual = hoje.getFullYear();

    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    const totalDiasMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();

    let primeiroDiaSemana = new Date(hoje.getFullYear(), hoje.getMonth(), 1).getDay();
    primeiroDiaSemana = primeiroDiaSemana === 0 ? 6 : primeiroDiaSemana - 1;

    return (
        //dashboard admin autenticado com user
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="topbar">
                <div className="topbar-left">
                    <span className="logo">MIRAI</span>
                    <span className="welcome">
                        ADMIN DASHBOARD | Bem vindo(a),{" "}
                        <span className="highlight">{auth?.user?.name}</span>
                    </span>
                </div>

                <ul className="topbar-right">
                    <li>NOTIFICAÇÕES</li>
                    <li className="divider"></li>
                    <li>CONTEÚDOS</li>
                    <li className="divider"></li>
                    <li>LISTA UTILIZADORES</li>
                    <li className="divider"></li>
                    <li>ADMINISTRAÇÃO</li>
                    <li className="divider"></li>
                    <li className="perfil">PERFIL</li>
                    <li className="logout">LOG OUT</li>
                </ul>
            </div>

            <div className="admin-wrapper">
                {/* barra lateral */}
                <div className="sidebar">
                    <h2 className="sidebar-title">MENU</h2>
                    <ul className="sidebar-list">
                        <li>Perfil</li>
                        <li>Editar Perfil</li>
                        <li>Helpdesk</li>
                        <li>Dashboards</li>
                        <li>Painel de Controlo</li>
                    </ul>
                </div>

                {/* dashboard de view geral */}
                <div className="main-content">
                    <div className="admin-container">
                        <div className="calendar-header">
                            <h3 className="calendar-title">DASHBOARD GERAL</h3>
                            <p className="calendar-subtitle">ESCOLHA UM MENU PARA MAIS INFORMAÇÕES</p>
                        </div>

                        <div className="mini-calendar-card">
                            <h3 className="mini-calendar-title">
                                {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} {anoAtual}
                            </h3>

                            <div className="mini-calendar-grid">
                                {diasSemana.map((d) => (
                                    <div key={d} className="mini-calendar-dayname">
                                        {d}
                                    </div>
                                ))}

                                {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
                                    <div key={"vazio-" + i}></div>
                                ))}

                                {Array.from({ length: totalDiasMes }, (_, i) => i + 1).map((dia) => (
                                    <div
                                        key={dia}
                                        className={`mini-calendar-day ${dia === diaAtual ? "mini-calendar-today" : ""
                                            }`}
                                    >
                                        {dia}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* cards de tarefas e contactos */}
                        <div className="card">
                            <h3 className="card-title">
                                Últimas Tarefas <br />
                                <span>ver mais</span>
                            </h3>

                            <div className="tasks-grid">
                                <div className="task-card">
                                    <h4 className="task-title">NOVO CONTEÚDO</h4>
                                    <p className="task-text">
                                        Pedido para carregamento de conteúdo de formação...
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Responsável:</span> José Felix
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Categoria:</span> React.js
                                    </p>
                                    <p className="task-time">Há 3 horas</p>
                                </div>

                                <div className="task-card">
                                    <h4 className="task-title ">ATUALIZAÇÃO PASS...</h4>
                                    <p className="task-text">
                                        Pedido para alteração de password de acesso à plataforma...
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Responsável:</span> Abel Ferreira
                                    </p>
                                    <p className="task-text">
                                        <span className="label">Categoria:</span> Password
                                    </p>
                                    <p className="task-time">Há 4 horas</p>
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
