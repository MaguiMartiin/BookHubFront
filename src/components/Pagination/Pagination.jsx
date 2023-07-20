import React from 'react';
import style from './Pagination.module.css'

const Pagination = ({max, page, setPage}) => {

    const handlePrevPage = () => {
        if(page < 2) return;
        setPage(page - 1)
    }
    
    const handleNextPage = () => {
        setPage(page + 1)
    }

    return (
        <div className={style.customPaginationContainer}>
          <div className={style.customPaginationButtons}>
            <button onClick={handlePrevPage} className={style.customPaginationButton}>
              🡸
            </button>
            <div className={style.customPaginationPage}>
              <span>{page}</span>
            </div>
            <button
              disabled={page >= max}
              onClick={handleNextPage}
              className={style.customPaginationButton}
            >
              🡺
            </button>
          </div>
        </div>
      );
}


export default Pagination