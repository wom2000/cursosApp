import { Link } from "@inertiajs/react";
import '../../css/DashboardCard.css'

export default function DashboardCard({ icon, title, description, href, badge }) {
    return (
        <Link href={href} className="dashboard-card">
            {badge && <span className="dashboard-card-badge">{badge}</span>}

            <div className="dashboard-card-icon">
                {icon}
            </div>

            <h3 className="dashboard-card-title">{title}</h3>
            <p className="dashboard-card-description">{description}</p>

            <div className="dashboard-card-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
