import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import "../../../css/AllNotifications.css";

export default function AllNotifications({ auth, notifications }) {
    const list = notifications ?? [];

    return (
        <MainLayout user={auth.user}>
            <Head title="Notificações" />

            <div className="notifications-page">
                {/* Header */}
                <div className="notifications-header">
                    <h1 className="notifications-title">Notificações</h1>
                    <p className="notifications-subtitle">
                        Veja todas as suas atualizações recentes.
                    </p>
                </div>

                {/* Lista de notificações */}
                <div className="notifications-feed">
                    {list.length === 0 && (
                        <p className="no-notifications">
                            Não tem notificações.
                        </p>
                    )}

                    {list.map((n) => (
                        <div
                            key={n.id}
                            className={`notification-card ${n.read ? "read" : "unread"
                                }`}
                        >
                            <div className="notification-icon">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </div>

                            <div className="notification-content">
                                <p className="notification-text">
                                    {n.message}
                                </p>
                                <span className="notification-time">
                                    {n.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
