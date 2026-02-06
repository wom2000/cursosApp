import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import "../../../css/PendingMaterials.css";

export default function PendingMaterials() {
    const { auth, materiais: initialMateriais } = usePage().props;
    const [materiais, setMateriais] = useState(initialMateriais || []);
    const [processing, setProcessing] = useState(null);

    const handleApprove = async (materialId) => {
        if (!confirm('Tem a certeza que deseja aprovar este material?')) return;

        setProcessing(materialId);

        try {
            const response = await fetch(`/materiais/${materialId}/status`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ status: 'aprovado' })
            });

            if (response.ok) {
                setMateriais(materiais.filter(m => m.id !== materialId));
                alert('Material aprovado com sucesso!');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(error.message || 'Erro ao aprovar material');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao aprovar material');
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (materialId) => {
        if (!confirm('Tem a certeza que deseja rejeitar este material?')) return;

        setProcessing(materialId);

        try {
            const response = await fetch(`/materiais/${materialId}/status`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ status: 'aprovado' })
            });

            if (response.ok) {
                setMateriais(materiais.filter(m => m.id !== materialId));
                alert('Material rejeitado');
            } else {
                const error = await response.json();
                alert(error.message || 'Erro ao rejeitar material');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao rejeitar material');
        } finally {
            setProcessing(null);
        }
    };

    const getFileIcon = (formato) => {
        const icons = {
            pdf: '📄',
            mp4: '🎥',
            mp3: '🎵',
            jpg: '🖼️',
            png: '🖼️',
            docx: '📝'
        };
        return icons[formato?.toLowerCase()] || '📎';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Materiais Pendentes" />

            <div className="pending-materials-container">
                <div className="pending-materials-header">
                    <h1 className="pending-materials-title">Materiais Pendentes</h1>
                    <p className="pending-materials-subtitle">
                        Revise e aprove os materiais enviados
                    </p>
                    <div className="pending-count">
                        {materiais.length} {materiais.length === 1 ? 'material' : 'materiais'} pendente{materiais.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {materiais.length === 0 ? (
                    <div className="no-materials">
                        <svg className="no-materials-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3>Nenhum material pendente</h3>
                        <p>Todos os materiais foram revisados!</p>
                    </div>
                ) : (
                    <div className="materials-list">
                        {materiais.map((material) => (
                            <div key={material.id} className="material-card">
                                <div className="material-card-header">
                                    <div className="material-icon">
                                        {getFileIcon(material.formato)}
                                    </div>
                                    <div className="material-info">
                                        <h3 className="material-name">{material.nome}</h3>
                                        <div className="material-meta">
                                            <span className="material-course">
                                                📚 {material.material_curso?.nome || 'Curso não encontrado'}
                                            </span>
                                            <span className="material-format">
                                                {material.formato?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="material-card-body">
                                    <div className="material-details">
                                        <div className="detail-item">
                                            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <div>
                                                <p className="detail-label">Enviado por</p>
                                                <p className="detail-value">{material.material_user?.name || 'Desconhecido'}</p>
                                            </div>
                                        </div>

                                        <div className="detail-item">
                                            <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="detail-label">Data de Envio</p>
                                                <p className="detail-value">{formatDate(material.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="material-actions">
                                        <button
                                            onClick={() => handleReject(material.id)}
                                            disabled={processing === material.id}
                                            className="btn-reject"
                                        >
                                            {processing === material.id ? (
                                                <svg className="spinner-small" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                <>
                                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Rejeitar
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleApprove(material.id)}
                                            disabled={processing === material.id}
                                            className="btn-approve"
                                        >
                                            {processing === material.id ? (
                                                <svg className="spinner-small" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                <>
                                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Aprovar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

// Resumo: Mostra materiais pendentes e permite aprovar ou rejeitar.
// React: useState para lista e loading por item, fetch para atualizar.
