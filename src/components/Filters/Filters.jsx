import style from './Filters.module.css'
import React from 'react';
import { useState,useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { filter, getAllBooks, getAuthor, getGenders } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';

const Filters = ({setPage}) => {
  const dispatch = useDispatch();

  const genders = useSelector((state) => state.genders)
  const authors = useSelector((state) => state.authors)

  useEffect(() => {
    dispatch(getGenders());
    dispatch(getAuthor());
  }, [dispatch]);


  const [filterByGender, setFilterByGender] = useState('');
  const [filtro, setFiltro] = useState({
      gender:"", 
      dataGender: "",
      author:"", 
      dataAuthor: "",
      price:"",
      dataPrice: [{minimo: "", maximo: ""}],
      releaseDate: "",
      dataReleateDate: [],
  });

 
  const decades = [];
  for (let startYear = 1950; startYear <= 2019; startYear += 10) {
    const endYear = startYear + 9;
    const decade = `${startYear}-${endYear}`;
    decades.push(decade);
  }

  const handleChange1 = (event) => {
    const { value } = event.target;
    const startYear = parseInt(value);
    const endYear = startYear + 9;
    const startDate = `${startYear}-01-01`;
    const endDate = `${endYear}-12-31`;
    setFiltro({
      ...filtro,
      releaseDate: 'releaseDate',
      dataReleateDate: [startDate, endDate],
    });
  };

  //genero
  const selectGender = (event) => {
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
    dispatch(filter(filtro));
  }, [filtro, dispatch]);


  const reset = () =>{
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


  return (
    <div className={style.filtersContainer}>
      <SearchBar filtro={filtro}/>
      <select id="yearSelect" onChange={handleChange1} className={style.selectOrder}>
        <option value="">Año</option>
        {decades.map((decade) => (
          <option key={decade} value={decade.split('-')[0]}>
            {decade}
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

      <input type="number" min="1" value={filtro.dataPrice[0].maximo} placeholder='Máximo' onChange={handleMaximo}/>

      <button className={style.resetButton} >
        <div className={style.resetButtonContent}>
          <button onClick={reset}>Reset</button>
        </div>
      </button>
    </div>
  );
};

export default Filters;