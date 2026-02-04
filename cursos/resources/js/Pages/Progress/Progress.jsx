import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "../../../css/Progress.css";

export default function Progress({ auth }) {
    const [progressos, setProgressos] = useState([]);
    const [cursosCompletados, setCursosCompletados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const [progressosRes, completadosRes] = await Promise.all([
                    axios.get("/progressos"),
                    axios.get("/progressos/cursos-completados"),
                ]);

                if (!isMounted) return;

                setProgressos(progressosRes.data ?? []);
                setCursosCompletados(completadosRes.data ?? []);
            } catch (err) {
                if (!isMounted) return;
                setError("Não foi possível carregar o progresso.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const { cursosEmProgresso, cursosConcluidos, totalMateriaisValidos } =
        useMemo(() => {
        const completados = (cursosCompletados ?? [])
            .filter((item) => item?.curso)
            .map((item) => ({
                ...item,
                curso: item.curso,
            }));

        const completedIds = new Set(
            completados.map((item) => item.curso.id),
        );

        const byCourse = new Map();
        let totalMateriaisValidos = 0;

        (progressos ?? []).forEach((item) => {
            const material = item.material ?? {};
            if (material.conta_progresso === false) return;
            totalMateriaisValidos += 1;
            const curso =
                material.material_curso || material.materialCurso || null;

            if (!curso) return;

            if (!byCourse.has(curso.id)) {
                byCourse.set(curso.id, {
                    curso,
                    vistos: 0,
                    a_ver: 0,
                    para_ver: 0,
                    updated_at: item.updated_at,
                });
            }

            const entry = byCourse.get(curso.id);
            const status = item.status;

            if (status === "visto") entry.vistos += 1;
            if (status === "a_ver") entry.a_ver += 1;
            if (status === "para_ver") entry.para_ver += 1;

            if (
                item.updated_at &&
                (!entry.updated_at ||
                    new Date(item.updated_at) > new Date(entry.updated_at))
            ) {
                entry.updated_at = item.updated_at;
            }
        });

        const cursosEmProgresso = Array.from(byCourse.values())
            .filter((entry) => !completedIds.has(entry.curso.id))
            .sort((a, b) =>
                new Date(b.updated_at || 0) - new Date(a.updated_at || 0),
            );

        const cursosConcluidos = completados.sort((a, b) => {
            const aDate = a.completado_em ? new Date(a.completado_em) : 0;
            const bDate = b.completado_em ? new Date(b.completado_em) : 0;
            return bDate - aDate;
        });

        return { cursosEmProgresso, cursosConcluidos, totalMateriaisValidos };
    }, [progressos, cursosCompletados]);

    const formatDate = (value) => {
        if (!value) return "—";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return new Intl.DateTimeFormat("pt-PT", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Progresso" />

            <div className="progress-page">
                <div className="progress-header">
                    <h1 className="progress-title">Progresso</h1>
                    <p className="progress-subtitle">
                    </p>
                </div>

                <div className="progress-stats">
                    <div className="progress-stat">
                        <span className="progress-stat-label">
                            Cursos em progresso
                        </span>
                        <strong className="progress-stat-value">
                            {cursosEmProgresso.length}
                        </strong>
                    </div>
                    <div className="progress-stat">
                        <span className="progress-stat-label">
                            Cursos concluídos
                        </span>
                        <strong className="progress-stat-value">
                            {cursosConcluidos.length}
                        </strong>
                    </div>
                    <div className="progress-stat">
                        <span className="progress-stat-label">
                            Materiais registados
                        </span>
                        <strong className="progress-stat-value">
                            {totalMateriaisValidos}
                        </strong>
                    </div>
                </div>

                {error && <p className="progress-error">{error}</p>}
                {loading && (
                    <p className="progress-loading">A carregar progresso...</p>
                )}

                {!loading && !error && (
                    <>
                        <section className="progress-section">
                            <div className="progress-section-header">
                                <h2 className="progress-section-title">
                                    Cursos a ver
                                </h2>
                                <p className="progress-section-subtitle">
                                    Conteúdos com progresso recente.
                                </p>
                            </div>

                            {cursosEmProgresso.length === 0 ? (
                                <div className="progress-empty">
                                    Ainda não há progresso registado.
                                </div>
                            ) : (
                                <div className="progress-grid">
                                    {cursosEmProgresso.map((entry) => (
                                        <div
                                            key={entry.curso.id}
                                            className="progress-card"
                                        >
                                            <div className="progress-card-header">
                                                <h3 className="progress-card-title">
                                                    {entry.curso.nome}
                                                </h3>
                                                <span className="progress-card-category">
                                                    {entry.curso.categoria?.nome ||
                                                        "Sem categoria"}
                                                </span>
                                            </div>

                                            <div className="progress-card-metrics">
                                                <span className="progress-metric">
                                                    Vistos: {entry.vistos}
                                                </span>
                                                <span className="progress-metric">
                                                    A ver: {entry.a_ver}
                                                </span>
                                                <span className="progress-metric">
                                                    Para ver: {entry.para_ver}
                                                </span>
                                            </div>

                                            <div className="progress-card-footer">
                                                <span className="progress-updated">
                                                    Atualizado em{" "}
                                                    {formatDate(
                                                        entry.updated_at,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="progress-section">
                            <div className="progress-section-header">
                                <h2 className="progress-section-title">
                                    Cursos concluídos
                                </h2>
                                <p className="progress-section-subtitle">
                                    Formações já finalizadas.
                                </p>
                            </div>

                            {cursosConcluidos.length === 0 ? (
                                <div className="progress-empty">
                                    Ainda não concluiu nenhum curso.
                                </div>
                            ) : (
                                <div className="progress-grid">
                                    {cursosConcluidos.map((item) => (
                                        <div
                                            key={item.curso.id}
                                            className="progress-card completed"
                                        >
                                            <div className="progress-card-header">
                                                <h3 className="progress-card-title">
                                                    {item.curso.nome}
                                                </h3>
                                                <span className="progress-card-category">
                                                    {item.curso.categoria?.nome ||
                                                        "Sem categoria"}
                                                </span>
                                            </div>

                                            <div className="progress-card-footer">
                                                <span className="progress-updated">
                                                    Concluído em{" "}
                                                    {formatDate(
                                                        item.completado_em,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </MainLayout>
    );
}

// Resumo: Agrega progresso por curso, ignora materiais de suporte e mostra cursos em progresso e concluidos.
// React: useState/useEffect para fetch, useMemo para agrupar e calcular.
