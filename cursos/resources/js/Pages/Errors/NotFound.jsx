import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import "../../../css/NotFound.css";

export default function NotFound({ auth }) {
    return (
        <MainLayout user={auth?.user}>
            <Head title="Página não encontrada" />
            <div className="notfound-page">
                <div className="notfound-card">
                    <p className="notfound-code">404</p>
                    <h1 className="notfound-title">
                        Página não encontrada
                    </h1>
                    <p className="notfound-subtitle">
                        O link pode estar errado ou a página foi removida.
                    </p>
                    <div className="notfound-actions">
                        <Link href="/" className="notfound-button">
                            Voltar à Home
                        </Link>
                        <Link href="/dashboard" className="notfound-link">
                            Ir para o Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
