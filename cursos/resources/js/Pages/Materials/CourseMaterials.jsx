import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "../../../css/CourseMaterials.css";

const STATUS_OPTIONS = [
    { value: "para_ver", label: "Para ver" },
    { value: "a_ver", label: "A ver" },
    { value: "visto", label: "Visto" },
];

export default function CourseMaterials({ auth, id }) {
    const [materiais, setMateriais] = useState([]);
    const [progressos, setProgressos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const [materiaisRes, progressosRes] = await Promise.all([
                    axios.get(`/materiais?id_curso=${id}`),
                    axios.get("/progressos"),
                ]);

                if (!isMounted) return;

                const materiaisPayload = materiaisRes.data;
                const paginated =
                    Array.isArray(materiaisPayload) && materiaisPayload.length
                        ? materiaisPayload[0]
                        : materiaisPayload;
                const lista = paginated?.data ?? paginated ?? [];

                setMateriais(lista);
                setProgressos(progressosRes.data ?? []);
            } catch (err) {
                if (!isMounted) return;
                setError("Não foi possível carregar os materiais.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const progressByMaterial = useMemo(() => {
        const map = new Map();
        (progressos ?? []).forEach((item) => {
            map.set(item.id_material, item.status);
        });
        return map;
    }, [progressos]);

    const cursoNome = materiais?.[0]?.material_curso?.nome ?? "Curso";
    const getMaterialUrl = (material) => {
        if (!material?.caminho_ficheiro) return null;
        return material.caminho_ficheiro.startsWith("materiais/")
            ? `/storage/${material.caminho_ficheiro}`
            : `/storage/materiais/${material.caminho_ficheiro}`;
    };
    const canManageProgressFlag =
        auth?.user?.role === "admin" || auth?.user?.role === "formador";

    const updateStatus = async (materialId, status) => {
        try {
            setUpdatingId(materialId);
            await axios.post("/progressos-criar", {
                id_material: materialId,
                status,
            });

            setProgressos((prev) => {
                const existing = prev.find(
                    (item) => item.id_material === materialId,
                );
                if (existing) {
                    return prev.map((item) =>
                        item.id_material === materialId
                            ? { ...item, status }
                            : item,
                    );
                }
                return [...prev, { id_material: materialId, status }];
            });
        } catch (err) {
            setError("Não foi possível atualizar o progresso.");
        } finally {
            setUpdatingId(null);
        }
    };

    const updateContaProgresso = async (materialId, contaProgresso) => {
        try {
            setTogglingId(materialId);
            await axios.patch(`/materiais/${materialId}/conta-progresso`, {
                conta_progresso: contaProgresso,
            });
            setMateriais((prev) =>
                prev.map((material) =>
                    material.id === materialId
                        ? { ...material, conta_progresso: contaProgresso }
                        : material,
                ),
            );
        } catch (err) {
            setError("Não foi possível atualizar o tipo do material.");
        } finally {
            setTogglingId(null);
        }
    };

    const deleteMaterial = async (materialId) => {
        if (!confirm("Tens a certeza que queres apagar este material?")) {
            return;
        }
        try {
            setDeletingId(materialId);
            await axios.delete(`/materiais/${materialId}`);
            setMateriais((prev) =>
                prev.filter((material) => material.id !== materialId),
            );
            setProgressos((prev) =>
                prev.filter((item) => item.id_material !== materialId),
            );
        } catch (err) {
            setError("Não foi possível apagar o material.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Materiais do Curso" />

            <div className="course-materials-page">
                <div className="course-materials-header">
                    <div>
                        <p className="course-materials-overline">
                            Materiais do curso
                        </p>
                        <h1 className="course-materials-title">{cursoNome}</h1>
                        <p className="course-materials-subtitle">
                            Atualize o seu progresso e organize os materiais.
                        </p>
                    </div>
                    <Link href={`/curso/${id}`} className="course-back-link">
                        Voltar ao curso
                    </Link>
                </div>

                {error && <p className="course-materials-error">{error}</p>}
                {loading && (
                    <p className="course-materials-loading">
                        A carregar materiais...
                    </p>
                )}

                {!loading && !error && (
                    <>
                        {materiais.length === 0 ? (
                            <div className="course-materials-empty">
                                Ainda não existem materiais aprovados para este
                                curso.
                            </div>
                        ) : (
                            <div className="course-materials-grid">
                                {materiais.map((material) => {
                                    const status = progressByMaterial.get(
                                        material.id,
                                    );
                                    const downloadUrl =
                                        getMaterialUrl(material);

                                    return (
                                        <div
                                            key={material.id}
                                            className="course-material-card"
                                        >
                                            <div className="material-card-header">
                                                <h3 className="material-card-title">
                                                    {material.nome}
                                                </h3>
                                                <span className="material-card-tag">
                                                    {material.formato?.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="material-card-meta">
                                                <span>
                                                    {material.material_user
                                                        ?.name ||
                                                        "Autor desconhecido"}
                                                </span>
                                                <span>
                                                    {material.status ===
                                                    "aprovado"
                                                        ? "Aprovado"
                                                        : "Pendente"}
                                                </span>
                                                <span>
                                                    {material.conta_progresso
                                                        ? "Conta no progresso"
                                                        : "Suporte"}
                                                </span>
                                            </div>

                                            <div className="material-card-actions">
                                                {downloadUrl ? (
                                                    <a
                                                        className="status-button download"
                                                        href={downloadUrl}
                                                        download
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Download
                                                    </a>
                                                ) : (
                                                    <span className="status-button download disabled">
                                                        Sem ficheiro
                                                    </span>
                                                )}
                                                {canManageProgressFlag && (
                                                    <button
                                                        type="button"
                                                        className="status-button danger"
                                                        onClick={() =>
                                                            deleteMaterial(
                                                                material.id,
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            material.id
                                                        }
                                                    >
                                                        Apagar
                                                    </button>
                                                )}
                                                {canManageProgressFlag && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={`status-button ${
                                                                material.conta_progresso
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                updateContaProgresso(
                                                                    material.id,
                                                                    true,
                                                                )
                                                            }
                                                            disabled={
                                                                togglingId ===
                                                                material.id
                                                            }
                                                        >
                                                            Matéria
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`status-button ${
                                                                material.conta_progresso ===
                                                                false
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                updateContaProgresso(
                                                                    material.id,
                                                                    false,
                                                                )
                                                            }
                                                            disabled={
                                                                togglingId ===
                                                                material.id
                                                            }
                                                        >
                                                            Suporte
                                                        </button>
                                                    </>
                                                )}
                                                {!canManageProgressFlag &&
                                                    material.conta_progresso &&
                                                    STATUS_OPTIONS.map(
                                                        (option) => (
                                                            <button
                                                                key={
                                                                    option.value
                                                                }
                                                                type="button"
                                                                className={`status-button ${
                                                                    status ===
                                                                    option.value
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        material.id,
                                                                        option.value,
                                                                    )
                                                                }
                                                                disabled={
                                                                    updatingId ===
                                                                    material.id
                                                                }
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ),
                                                    )}
                                            </div>

                                            <div className="material-card-footer">
                                                <span>
                                                    Estado atual:{" "}
                                                    {status
                                                        ? STATUS_OPTIONS.find(
                                                            (opt) =>
                                                                opt.value ===
                                                                status,
                                                        )?.label
                                                        : "Sem progresso"}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}

// React: useState/useEffect para fetch, useMemo para mapear progresso.
