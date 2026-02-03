import { Link } from "@inertiajs/react";
import '../../css/SkillsCard.css'

export default function SkillCard({ curso, imagePosition = 'left' }) {
    const isImageLeft = imagePosition === 'left';

    // ✅ Define o caminho da imagem uma única vez
    const imageSrc = curso.imagem_curso
        ? `/storage/${curso.imagem_curso}`
        : '/images/placeholder.png';

    return (
        <div className="skills-block">
            {isImageLeft ? (
                <>
                    <div className="skills-image-left">
                        <div className="image-container">
                            <img
                                src={imageSrc}
                                alt={curso.nome}
                                className="course-image"
                            />
                        </div>
                    </div>
                    <div className="skills-content-right">
                        <h3 className="skills-title">{curso.nome}</h3>
                        <p className="skills-description">{curso.descricao}</p>
                        <div>
                            <Link href={route('cursos.show', curso.id)} className="skills-link">
                                <span className="skills-link-text">VER MAIS</span>
                                <svg className="skills-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="skills-content-left">
                        <h3 className="skills-title">{curso.nome}</h3>
                        <p className="skills-description">{curso.descricao}</p>
                        <div>
                            <Link href={route('cursos.show', curso.id)} className="skills-link">
                                <span className="skills-link-text">VER MAIS</span>
                                <svg className="skills-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="skills-image-right">
                        <div className="image-container">
                            <img
                                src={imageSrc}
                                alt={curso.nome}
                                className="course-image"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
