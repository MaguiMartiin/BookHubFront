import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ book }) => {
  return (
    <div className={style.cards}>
      <div className={style.info}>
        <img src={book?.image} className={style.image} alt={book?.name} />
        <div className={style.detailsContainer}>
          <p className={style.name}>{book?.name}</p>
          <p className={style.genre}>{book.Gender?.name}</p>
          <p className={style.price}>${book?.price}</p>
          <div className={style.buttons}>
            <Link to={`/home/${book.id}`}><button className={style.details}>Ver detalle</button></Link>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
