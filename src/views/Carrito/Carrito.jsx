import style from './Carrito.module.css'
import React from 'react';
import { getAllBooks } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

const Carrito = () => {
  const dispatch = useDispatch();
  const copyState = useSelector((state) => state.copyState);
  console.log(copyState);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      copyState?.slice(0, 5).forEach((book) => {
        total += book.price * selectedQuantities[book.id];
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [copyState, selectedQuantities]);

  useEffect(() => {
    const initialQuantities = copyState?.slice(0, 5).reduce((quantities, book) => {
      quantities[book.id] = 1;
      return quantities;
    }, {});
    setSelectedQuantities(initialQuantities);
  }, [copyState]);

  const handleQuantityChange = (bookId, value) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [bookId]: Math.max(1, prevQuantities[bookId] + value), 
    }));
  };

  return (
    <div className={style.cartContainer}>
      <div className={style.cardContainer}>
        {copyState?.slice(0, 5).map((book) => (
          <div key={book.id} className={style.card}>
            <div className={style.imageContainer}>
              <img src={book.image} alt={book.name} className={style.bookImage} />
            </div>
            <div className={style.bookInfo}>
              <h1>{book.name}</h1>
              <h2>Precio: ${book.price}</h2>
              <p>Disponibles: {book.available}</p>
              <p>Género: {book.Gender?.name}</p>
              <p>Autor: {book.Author?.name}</p>
              <div className={style.quantityControls}>
                <button className={style.quantityButton} onClick={() => handleQuantityChange(book.id, -1)}>-</button>
                <input
                  type="number"
                  value={selectedQuantities[book.id]}
                  min="1"
                  readOnly
                  className={style.quantityInput}
                />
                <button className={style.quantityButton} onClick={() => handleQuantityChange(book.id, 1)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={style.totalPriceContainer}>
        <h3>Total:</h3>
        <p className={style.totalPrice}>${totalPrice}</p>
      </div>
    </div>
  );
}

export default Carrito;
