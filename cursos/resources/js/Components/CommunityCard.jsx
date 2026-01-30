import '../../css/CommunityCard.css'

export default function CommunityCard({ icon, title, description }) {
    return (
        <div className="community-card">
            <div className="community-card-icon">
                {icon}
            </div>
            <h3 className="community-card-title">{title}</h3>
            <p className="community-card-description">{description}</p>
        </div>
    );
}
