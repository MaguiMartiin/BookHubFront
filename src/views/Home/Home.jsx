
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import React from 'react';
import style from './Home.module.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from '../../redux/actions';


const Home = () => {

const dispatch = useDispatch();
const books = useSelector((state) => state.AllBooks);
console.log(books);

const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(6);

const idxLast = page * perPage;
const idxFirst = idxLast - perPage;
const currentData = books.slice(idxFirst, idxLast);
const max = Math.ceil(books.length / perPage);


useEffect(() => {
  dispatch(getAllBooks());
  setPage(1);
}, [dispatch]);


  return (
    <div className={style.booksContainer}> 
      <header className={style.searchContainer}>
        <SearchBar/>
      </header>
      <aside className={style.FilterContainer}>
        <Filters/>
      </aside>
      <div className={style.cardContainer}>
        {(currentData?.map((book,idx)=>(
          <div key={idx} className={style.card}>
            <Card book={book}/>
          </div>
        ))
        )}
      </div>
      <Pagination page={page} setPage={setPage} perPage={perPage} max={max}/>
    </div>
  );
};

export default Home;