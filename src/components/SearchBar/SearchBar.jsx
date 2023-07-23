import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css'
import React, { useEffect, useState } from 'react';
import { filter } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch()
  const [name,setName ] = useState({
    search: "",
    dataSearch: ""
  })
  const handleName = (e) => {
    const {value} = e.target;
    setName({
      ...name,
      search: "search",
      dataSearch: value
    })
    console.log(name)
  }
useEffect(()=>{
  console.log("name",name)
  dispatch(filter(name))
},[name])

  return (
    <div className={style.searchBarContainer}>
      <form
        className={style.searchBarForm}
      >
        <input
          className={style.searchBarInput}
          onChange={handleName}
          value={name.dataSearch}
          placeholder='SEARCH A BOOK...'
        />
      </form>
    </div>
  );
};

export default SearchBar;