import style from './Filters.module.css'
import React from 'react';
import { useState,useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { filter, getAllBooks, getAuthor, getGenders } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';

const Filters = ({setPage}) => {
  const dispatch = useDispatch();

  const copyState = useSelector((state) => state.copyState)
  //const allBooks = useSelector((state) => state.allBooks)
  const genders = useSelector((state) => state.genders)
  const authors = useSelector((state) => state.authors)

  useEffect(() => {
    dispatch(getGenders());
    dispatch(getAuthor());
  }, [dispatch]);

  const [order, setOrder] = useState('');
  const [filterByGender, setFilterByGender] = useState('');
  //const [filteredBooks, setFilteredBooks] = useState([]);
  const [filtro, setFiltro] = useState({
      gender:"", 
      dataGender: "",
      author:"", 
      dataAuthor: "",
      price:"",
      dataPrice: [{minimo: "", maximo: ""}],
      releaseDate: "",
      dataReleateDate: [],
      search: "",
      dataSearch: ""
  });

 
  const years = [];
  for (let year = 2000; year <= 2023; year++) {
    years.push(year);
  }

//fecha
  const handleChange = (event) => {
    console.log("fecha",event.target.value)
    const { value } = event.target;
    const startDate = `${value}-01-01`;
    const endDate = `${value}-12-31`;
    setFiltro({
      ...filtro,
      releaseDate: "releaseDate",
      dataReleateDate: [startDate, endDate]
    })
  };
  const handleOrder = () => {
    let books = [...copyState];
    if(order === 'high') books = books.sort((a, b) => b.price - a.price);
    if(order === 'low') books = books.sort((a, b) => a.price - b.price);
    if (order === 'asc') books = books.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    if (order === 'desc') books = books.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    dispatch(filter(books));
  }

  //genero
  const selectGender = (event) => {
    console.log(event.target.value)
    const { value } = event.target;
    setFiltro({
      ...filtro,
      gender:"gender", 
      dataGender: value
    })
    setPage(1);
  };
  
  //autor
  const selectAuthor = (event) => {
    const { value } = event.target;
    setFiltro({
      ...filtro,
      author: "author", 
      dataAuthor: value
    })   
    setPage(1);
  };

  //precio minimo
  const handleMinimo = (event) => {
    const { value } = event.target;

      setFiltro({
        ...filtro,
        price: "price",
        dataPrice: [{ ...filtro.dataPrice[0], minimo: value, maximo: filtro.dataPrice[0].maximo }]
      });
      setPage(1);

  };
  
  //precio maximo
  const handleMaximo = (event) => {
    const { value } = event.target;

    setFiltro({
      ...filtro,
      price: "price",
      dataPrice: [{ ...filtro.dataPrice[0], minimo: filtro.dataPrice[0].minimo, maximo: value }]
    });
    setPage(1);

    
  };

  useEffect(() => {
    console.log("aaa", filtro);
    dispatch(filter(filtro));
  }, [filtro]);


  const reset = () =>{
    setOrder('');
    setFilterByGender('');
    dispatch(getAllBooks());
    setFiltro({      
    gender:"", 
    dataGender: "",
    author:"", 
    dataAuthor: "",
    price:"",
    dataPrice: [{minimo: "", maximo: ""}],
    releaseDate: "",
    dataReleateDate: [],
    search: "",
    dataSearch: ""
  })
    setPage(1);
  }

  
  useEffect(() => {
    handleOrder()
    setPage(1)
  }, [order]);

  return (
    <div className={style.filtersContainer}>
      <SearchBar filtro={filtro}/>
      <select id="yearSelect" onChange={handleChange} className={style.selectOrder}>
        <option value=""> Año </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select className={style.selectOrder} onChange={selectAuthor}>
        <option value="all">Autor</option>
        {authors?.map((e, i)=>
          <option key={i} value={e}>
          {e}
        </option>
        )}
      </select>

      <select value={filterByGender} className={style.selectGender} onChange={selectGender}>
        <option value="all">Género</option>
          {genders?.map((gender, idx) => 
            <option key={idx} value={gender}>
              {gender}
            </option>
          )}
      </select>

      <input type="number" min="1" value={filtro.dataPrice[0].minimo} placeholder='Mínimo' onChange={handleMinimo}/>

      <input type="number" value={filtro.dataPrice[0].maximo} placeholder='Máximo' onChange={handleMaximo}/>

      <button className={style.resetButton} >
        <div className={style.resetButtonContent}>
          <button onClick={reset}>Reset</button>
        </div>
      </button>
    </div>
  );
};

export default Filters;