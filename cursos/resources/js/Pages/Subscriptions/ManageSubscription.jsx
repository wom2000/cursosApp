import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import "../../../css/Subscription.css";

export default function ManageSubscription({ subscricao, userId }) {
    const [processing, setProcessing] = useState(false);
    const [currentSubscricao, setCurrentSubscricao] = useState(subscricao);

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getStatusLabel = (status) => {
        const labels = {
            ativa: "Ativa",
            expirada: "Expirada",
            cancelada: "Cancelada",
        };
        return labels[status] || status;
    };

    const getStatusClass = (status) => {
        const classes = {
            ativa: "status-active",
            expirada: "status-expired",
            cancelada: "status-cancelled",
        };
        return classes[status] || "";
    };

    const handleCancel = () => {
        if (!currentSubscricao) return;

        if (!confirm("Tens a certeza que queres cancelar a tua subscrição?")) {
            return;
        }

        setProcessing(true);
        axios
            .patch(`/subscricao/${currentSubscricao.id}/cancelar`)
            .then((response) => {
                setCurrentSubscricao(response.data);
            })
            .catch((err) => {
                console.error("Erro ao cancelar:", err);
                alert("Erro ao cancelar a subscrição");
            })
            .finally(() => setProcessing(false));
    };

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gerir Subscrição
                </h2>
            }
        >
            <Head title="Gerir Subscrição" />
            <div className="subscription-page">
                <div className="row">
                    <h4 className="subscription-pretitle">A tua subscrição</h4>
                    <h2 className="subscription-title">
                        Detalhes da Subscrição
                    </h2>
                </div>

                {currentSubscricao ? (
                    <div className="row">
                        <div className="subscription-card-management">
                            <div className="subscription-details">
                                <div className="subscription-detail-row">
                                    <span className="detail-label">
                                        Estado:
                                    </span>
                                    <span
                                        className={`detail-value status-badge ${getStatusClass(currentSubscricao.status)}`}
                                    >
                                        {getStatusLabel(
                                            currentSubscricao.status,
                                        )}
                                    </span>
                                </div>
                                <div className="subscription-detail-row">
                                    <span className="detail-label">
                                        Data de Início:
                                    </span>
                                    <span className="detail-value">
                                        {formatDate(
                                            currentSubscricao.data_inicio,
                                        )}
                                    </span>
                                </div>
                                <div className="subscription-detail-row">
                                    <span className="detail-label">
                                        Data de Fim:
                                    </span>
                                    <span className="detail-value">
                                        {formatDate(currentSubscricao.data_fim)}
                                    </span>
                                </div>
                            </div>

                            {currentSubscricao.status === "ativa" && (
                                <div className="subscription-actions">
                                    <PrimaryButton
                                        onClick={handleCancel}
                                        disabled={processing}
                                        className="cancel-button"
                                    >
                                        {processing
                                            ? "A cancelar..."
                                            : "Cancelar Subscrição"}
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="subscription-card-management">
                            <div className="centered">
                                <div className="subscription-card-icon">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="subscription-card-title">
                                    Sem subscrição ativa
                                </h3>
                                <p className="subscription-card-description">
                                    Não tens nenhuma subscrição ativa de
                                    momento.
                                </p>
                                <div
                                    className="subscription-actions"
                                    style={{ marginTop: "1.5rem" }}
                                >
                                    <PrimaryButton
                                        onClick={() =>
                                            (window.location.href =
                                                route("CreateSubscription"))
                                        }
                                    >
                                        Subscrever Agora
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
