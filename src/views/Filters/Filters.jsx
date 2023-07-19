import style from './Filters.module.css'
import React from 'react';

const Filters = () => {
 
  

  return (
    <div className={style.filtersContainer}>
      <select className={style.selectOrder}>
        <option value="">Año</option>
        <option value="">Nuevos</option>
        <option value="">Antiguos</option>
      </select>

      <select className={style.selectOrder}>
        <option value="">Autor</option>
        <option value="">autor1</option>
        <option value="">autor2</option>
      </select>

      <select className={style.selectGender}>
        <option value="">Género</option>
        <option>Terror</option>
        <option>Romance</option>
      </select>

      <select className={style.selectOrder}>
        <option value="">Precio</option>
        <option value="">Ascendente</option>
        <option value="">Descendente</option>
      </select>

      <button className={style.resetButton} >
        <div className={style.resetButtonContent}>
          <span>Reset</span>
        </div>
      </button>
    </div>
  );
};

export default Filters;