import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBookByName } from '../../redux/actions';
import Swal from 'sweetalert2';


const SearchBar = ({copyState, updateFilter}) => {

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');

  const eventChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    dispatch(getBookByName(searchValue));
  }, [dispatch, searchValue]);



  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = copyState.filter((book) =>
      book.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filtered.length === 0) {
      Swal.fire({
        title: 'Book not found',
        icon: 'error',
      });
    } else {
      updateFilter(filtered);
    }
    setSearchValue('');
  };


  return (
    <div className={style.searchBarContainer}>
      <form
        onSubmit={handleSearch}
        className={style.searchBarForm}
      >
        <input
          value={searchValue}
          onChange={eventChange}
          className={style.searchBarInput}
          placeholder='SEARCH A BOOK...'
        />
         <button
          type='submit'
          className={style.searchBarButton}
        >
          <div className={style.searchBarButtonContent}>
            <span className='material-symbols-outlined'>search</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;