import React from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { topBooks } from '../../redux/actions';

const Carousel = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(topBooks())
  }, [dispatch])

  const topBook = useSelector(state => state.topBooks)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,         // Habilitar el autoplay
    autoplaySpeed: 2000,    // Velocidad de cambio en milisegundos (2 segundos)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mi Carrusel</h1>
      <Slider {...settings}>
      {topBook.map((book) => (
          <div key={book.id} className="px-4">
            <img src={book.image} alt={book.name} className="w-40 h-60 object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
