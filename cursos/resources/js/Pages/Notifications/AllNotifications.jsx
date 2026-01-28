import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AllNotifications({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Notificações" />

            <div style={{ padding: "2rem", color: "white" }}>
                <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                    Todas as Notificações
                </h1>

                <p style={{ opacity: 0.8 }}>
                    Aqui vais ver todas as notificações do sistema.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
