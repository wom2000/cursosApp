import { Link } from "@inertiajs/react";
import "../../css/CategoriaCard.css";

export default function CategoriaCard({
    icon,
    title,
    description,
    href,
    badge,
}) {
    return (
        <Link href={href} className="categoria-card">
            {badge && <span className="categoria-card-badge">{badge}</span>}

            <div className="categoria-card-icon">{icon}</div>

            <h3 className="categoria-card-title">{title}</h3>
            <p className="categoria-card-description">{description}</p>

            <div className="categoria-card-arrow">
                VER CURSOS
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </Link>
    );
}
