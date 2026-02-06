import Carousel from "react-bootstrap/Carousel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link } from "@inertiajs/react";
import "../../css/CarouselBanner.css";

function CarouselBanner({ cursos = [] }) {
    const slides = (cursos ?? []).slice(0, 3);

    if (slides.length === 0) {
        return null;
    }

    const getImage = (curso) => {
        if (!curso?.imagem_curso) return "/images/imagensCursos/placeholder.png";
        return curso.imagem_curso.startsWith("images/")
            ? `/${curso.imagem_curso}`
            : `/storage/${curso.imagem_curso}`;
    };

    return (
        <Carousel interval={3000} controls={true} indicators={true}>
            {slides.map((curso) => (
                <Carousel.Item key={curso.id}>
                    <img
                        className="carousel-image"
                        src={getImage(curso)}
                        alt={curso.nome || "Curso"}
                    />
                    <Carousel.Caption className="carousel-caption-center">
                        <h3 className="carousel-title">{curso.nome}</h3>
                        <Link href={`/curso/${curso.id}`}>
                            <PrimaryButton>Ver mais</PrimaryButton>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselBanner;
