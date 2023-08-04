import React from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPuntuation } from '../../redux/actions';

const Carousel = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPuntuation())
  }, [dispatch])

  const puntuation = useSelector(state => state.puntuations)
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mi Carrusel</h1>
      <Slider >
      </Slider>
    </div>
  );
};

export default Carousel;
