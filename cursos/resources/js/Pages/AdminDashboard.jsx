import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "./AdminDashboard.css";

export default function AdminDashboard({ auth }) {
    // calendário atual
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.toLocaleString("pt-PT", { month: "long" });
    const anoAtual = hoje.getFullYear();

    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    const totalDiasMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();

    let primeiroDiaSemana = new Date(hoje.getFullYear(), hoje.getMonth(), 1).getDay();
    primeiroDiaSemana = primeiroDiaSemana === 0 ? 6 : primeiroDiaSemana - 1;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="admin-title">
                    Admin Dashboard | Bem vindo(a), <span style={{ color: "#CC0266" }}>{auth?.user?.name}</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="admin-wrapper">
                <div className="admin-container">

                    {/* calendário cont*/}
                    <div className="mini-calendar-card">
                        <h3 className="mini-calendar-title">
                            {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} {anoAtual}
                        </h3>

                        <div className="mini-calendar-grid">

                            {diasSemana.map((d) => (
                                <div key={d} className="mini-calendar-dayname">{d}</div>
                            ))}

                            {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
                                <div key={"vazio-" + i}></div>
                            ))}

                            {Array.from({ length: totalDiasMes }, (_, i) => i + 1).map((dia) => (
                                <div
                                    key={dia}
                                    className={`mini-calendar-day ${dia === diaAtual ? "mini-calendar-today" : ""}`}
                                >
                                    {dia}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* tarefas*/}
                    <div className="card">
                        <h3 className="card-title">Últimas Tarefas <br /><h1>ver mais</h1></h3>

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

                    {/* contactos */}
                    <div className="card">
                        <h3 className="card-title">Contactos</h3>

                        <ul className="contacts-list">
                            <li><strong>Email:</strong> hello@mirai.com</li>
                            <li><strong>Instagram:</strong> @mirai.cesae</li>
                            <li><strong>Facebook:</strong> MiraiCesae</li>
                            <li><strong>Morada:</strong> R. de Fundões 151, 3700-121 São João da Madeira</li>
                            <li><strong>Telefone:</strong> (+351) 256 123 456</li>
                        </ul>

                        <p className="footer-text">Mirai © 2026 Cesae Digital</p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
