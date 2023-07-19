import style from './SearchBar.module.css'
import React from 'react';

const SearchBar = () => {
  

  return (
    <div className={style.searchBarContainer}>
      <form
        className={style.searchBarForm}
      >
        <input
          className={style.searchBarInput}
          placeholder='SEARCH A BOOK...'
        />
      </form>
    </div>
  );
};

export default SearchBar;