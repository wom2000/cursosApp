import Carousel from 'react-bootstrap/Carousel';
import PrimaryButton from '@/Components/PrimaryButton';
import '../../css/CarouselBanner.css';

function CarouselBanner() {
  return (
    <Carousel interval={3000} controls={true} indicators={true}>
      <Carousel.Item>
        <img
          className="carousel-image"
          src="/images/bannerreact.jpg"
          alt="Primeira imagem"
        />
        <Carousel.Caption className="carousel-caption-center">
          <h3 className="carousel-title">react para iniciantes</h3>
          <PrimaryButton>Ver mais</PrimaryButton>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carousel-image"
          src="/images/bannerphp.jpg"
          alt="Segunda imagem"
        />
        <Carousel.Caption className="carousel-caption-center">
          <h3 className="carousel-title">laravel avancado</h3>
          <PrimaryButton>Ver mais</PrimaryButton>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carousel-image"
          src="/images/bannermktdigital.jpg"
          alt="Terceira imagem"
        />
        <Carousel.Caption className="carousel-caption-center">
          <h3 className="carousel-title">Marketing Digital em Gestão</h3>
          <PrimaryButton>Ver mais</PrimaryButton>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBanner;
