import MainLayout from "@/Layouts/MainLayout";
import "../../../css/AllUsers.css";

export default function AllUsers({ auth }) {
    return (
        <MainLayout user={auth.user}>
            <div className="all-users-container">
                <h1 className="all-users-title">Gerir Utilizadores</h1>

                <p className="all-users-description">
                    Lista de todos os utilizadores registados na plataforma.
                </p>

                <div className="all-users-placeholder">
                    Nenhum utilizador carregado.
                </div>
            </div>
        </MainLayout>
    );
}
