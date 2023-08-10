import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { topBooks } from '../../redux/actions';
import './carousel.css';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(topBooks());
  }, [dispatch]);

  const topBook = useSelector(state => state.topBooks);
  console.log(topBook);


  const splideOptions = {
    type: 'slide',
    perPage: 1,
    focus: 'center',
    autoplay: true,
    interval: 3000, 
    easing: 'cubic-bezier(.23, 1, .32, 1)', 
  };

  return (
    <div className="my-20 bg-gray-100 w-full py-2 font-primary ">
      <div className="max-w-screen-lg mx-auto p-6 bg-gray-100 rounded-lg ">
        <h1 className="text-3xl font-bold mb-2 text-center text-violeta">LIBROS MÁS COMPRADOS</h1>
        <Splide options={splideOptions}>
          {topBook?.slice(0,5).map(book => (
            <SplideSlide key={book.id}>
              <div className="flex flex-col items-center h-[400px] justify-center">
                <img src={book.image} alt={book.name} className="w-64 h-80 object-cover rounded-lg shadow-xl transform transition-transform hover:scale-105 mb-4" />
                <p className='font-bold text-violeta text-xl'>{book.name.toUpperCase()}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>

        <div className="flex justify-center mt-8">
          <button onClick={() => navigate('/home')} className="py-4 px-10 text-white bg-gradient-to-r from-violeta to-rojo rounded-md hover:scale-105 transform transition-transform duration-300 ease-in-out">
            VER MÁS!
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Carousel;
