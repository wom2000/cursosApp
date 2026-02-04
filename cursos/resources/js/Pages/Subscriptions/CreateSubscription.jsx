import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import "../../../css/Subscription.css";

export default function CreateSubscription() {
    const [plan, setPlan] = useState("anual");
    const [processing, setProcessing] = useState(false);

    const handleSubscribe = (selectedPlan) => {
        setProcessing(true);
        axios
            .post(route("subscricoes.store"), { plan: selectedPlan })
            .then(() => {
                const msg =
                    selectedPlan === "anual"
                        ? "Subscrito por um ano"
                        : "Subscrito por um mês";
                window.location.href =
                    route("dashboard.estudante") +
                    `?success=${encodeURIComponent(msg)}`;
            })
            .catch((err) => {
                console.error("Subscription error:", err);
                // Optionally show an error to the user
            })
            .finally(() => setProcessing(false));
    };

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Subscrever{" "}
                </h2>
            }
        >
            <Head title="Subscrever" />
            <>
                <div className="subscription-page">
                    <div className="row row-1">
                        <div>
                            <h4 className="subscription-pretitle">
                                Aprofunda o conhecimento
                            </h4>
                            <h2 className="subscription-title">
                                Desenvolve competências para a tranformação
                                digital
                            </h2>
                            <div className="box-subscription">
                                <div className="plan-toggle">
                                    <button
                                        className={
                                            plan === "anual" ? "active" : ""
                                        }
                                        onClick={() => setPlan("anual")}
                                    >
                                        ANUAL
                                    </button>
                                    <button
                                        className={
                                            plan === "mensal" ? "active" : ""
                                        }
                                        onClick={() => setPlan("mensal")}
                                    >
                                        MENSAL
                                    </button>
                                </div>

                                <div className="plan-info">
                                    {plan === "anual" ? (
                                        <>
                                            <div className="price-and-action">
                                                <div className="price-left">
                                                    <p className="monthly">
                                                        24.99€/mês
                                                    </p>
                                                    <label className="annual-note">
                                                        pagamento anual de
                                                        299.88€
                                                    </label>
                                                </div>
                                                <div className="action-right">
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        onClick={() =>
                                                            handleSubscribe(
                                                                "anual",
                                                            )
                                                        }
                                                    >
                                                        SUBSCREVER
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="price-and-action">
                                            <div className="price-left">
                                                <p className="monthly">
                                                    49.99€/mês
                                                </p>
                                                <label className="monthly-note"></label>
                                            </div>
                                            <div className="action-right">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    onClick={() =>
                                                        handleSubscribe(
                                                            "mensal",
                                                        )
                                                    }
                                                >
                                                    SUBSCREVER
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="subscription-footnote">
                                Aplicam-se os termos e condições. Pode cancelar
                                a sua renovação de subscrição quando quiser.
                                Depois de um ano, o preço de renovação será de
                                599.99€
                            </p>
                        </div>

                        <div className="subscription-card">
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="subscription-card-title">
                                    Acesso a todos os cursos
                                </h3>
                                <p className="subscription-card-description">
                                    Cursos, formações e conteúdos exclusivos que
                                    te vão ajudar a aprimorar as suas skills
                                    principais.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row row-2">
                        <div className="subscription-card">
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
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </div>
                            <div className="subscription-card-text">
                                <h3 className="subscription-card-title">
                                    Certificados Reconhecidos
                                </h3>
                                <p className="subscription-card-description">
                                    A cada formação do curso concluída, ganhará
                                    um certificado validado pelas empresas do
                                    setor.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row row-3">
                        <div className="subscription-card">
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
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                    />
                                </svg>
                            </div>
                            <div className="subscription-card-text">
                                <h3 className="subscription-card-title">
                                    A melhor didática
                                </h3>
                                <p className="subscription-card-description">
                                    Desafios reais, projetos práticos e a melhor
                                    didática, recomendado por quem estuda
                                    connosco.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MainLayout>
    );
}
