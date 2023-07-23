import style from './Filters.module.css'
import React from 'react';
import { useState,useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { filter, getAllBooks, getGenders } from '../../redux/actions';

const Filters = ({setPage}) => {
  const dispatch = useDispatch();

  const copyState = useSelector((state) => state.copyState)
  const allBooks = useSelector((state) => state.allBooks)
  const genders = useSelector((state) => state.genders)


  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);

  const [order, setOrder] = useState('');
  const [filterByGender, setFilterByGender] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);


  const handleOrder = () => {
    let books = [...copyState];
    if(order === 'high') books = books.sort((a, b) => b.price - a.price);
    if(order === 'low') books = books.sort((a, b) => a.price - b.price);
    if (order === 'asc') books = books.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    if (order === 'desc') books = books.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    dispatch(filter(books));
  }


  const selectGender = (event) => {
    const selectedGender = event.target.value;
    setFilterByGender(selectedGender);
  
    if (selectedGender === 'all') {
      dispatch(getAllBooks());
      
    } else {
      const filteredBooks = allBooks?.filter((book) => book.Gender.name === selectedGender);
      setFilteredBooks(filteredBooks);
      dispatch(filter(filteredBooks));
    }
    setPage(1);
  };
  


  const reset = () =>{
    setOrder('');
    setFilterByGender('');
    dispatch(getAllBooks());
    setPage(1);
  }

  
  useEffect(() => {
    handleOrder()
    setPage(1)
  }, [order]);

  return (
    <div className={style.filtersContainer}>
      <select value={order} onChange={(event) => setOrder(event.target.value)} className={style.selectOrder}>
        <option value="">Año</option>
        <option value="asc">Nuevos</option>
        <option value="desc">Antiguos</option>
      </select>

      <select className={style.selectOrder}>
        <option value="">Autor</option>
        <option value="">autor1</option>
        <option value="">autor2</option>
      </select>

      <select value={filterByGender} className={style.selectGender} onChange={selectGender}>
        <option value="all">Género</option>
          {genders?.map((gender, idx) => 
            <option key={idx} value={gender}>
              {gender}
            </option>
          )}
      </select>


      <select value={order} onChange={(event) => setOrder(event.target.value)} className={style.selectOrder}>
        <option value="">Precio</option>
        <option value="high">High price</option>
        <option value="low">Low price</option>
      </select>

      <button className={style.resetButton} >
        <div className={style.resetButtonContent}>
          <button onClick={reset}>Reset</button>
        </div>
      </button>
    </div>
  );
};

export default Filters;