import MainLayout from "@/Layouts/MainLayout";
import "../../../css/AllSubscriptions.css";

export default function AllSubscriptions({ auth }) {
    return (
        <MainLayout user={auth.user}>
            <div className="all-subscriptions-container">
                <h1 className="all-subscriptions-title">Gerir Subscrições</h1>

                <p className="all-subscriptions-description">
                    Lista de todas as subscrições registadas na plataforma.
                </p>

                <div className="all-subscriptions-placeholder">
                    Nenhuma subscrição carregada.
                </div>
            </div>
        </MainLayout>
    );
}
