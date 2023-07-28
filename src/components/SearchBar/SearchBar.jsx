import style from './SearchBar.module.css'
import React from 'react';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { filter, getAllBooks, getAuthor, getGenders } from '../../redux/actions';

const SearchBar = ({setPage}) => {
  const dispatch = useDispatch()
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
    dataSearch: "",
    fecha: ""
});
  const genders = useSelector((state) => state.genders)
  const authors = useSelector((state) => state.authors)
  const handleName = (e) => {
    const {value} = e.target;
    setFiltro({
      ...filtro,
      search: "search",  
      dataSearch: value
    })
    setPage(1);
  }
useEffect(()=>{
  dispatch(filter(filtro))
},[filtro])


  useEffect(() => {
    dispatch(getGenders());
    dispatch(getAuthor());
  }, [dispatch]);

 
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
      fecha: `${startYear}`
    });
    setPage(1);
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
    dataSearch: "",
    fecha: ""
  })
    setPage(1);
  }

  return (
    <div className={style.searchBarContainer}>
      <form
        className={style.searchBarForm}
      >
        <input
          value={filtro.dataSearch}
          onChange={handleName}
          className={style.searchBarInput}
          placeholder='BUSCAR LIBROS...'
        />
        
      </form>
      <select onChange={handleChange1} className={style.selectOrder} value={filtro.fecha}>
        <option value="all">Año</option>
        {decades.map((decade, i) => (
          <option key={i} value={decade.split('-')[0]}>
            {decade}
          </option>
        ))}
      </select>

      <select value={filtro.dataAuthor} className={style.selectOrder} onChange={selectAuthor}>
        <option value="all">Autor</option>
        {authors?.map((e, i)=>
          <option key={i} value={e}>
          {e}
        </option>
        )}
      </select>

      <select value={filtro.dataGender} className={style.selectGender} onChange={selectGender}>
        <option value="all">Género</option>
          {genders?.map((gender, idx) => 
            <option key={idx} value={gender}>
              {gender}
            </option>
          )}
      </select>

      <input 
      type="number" 
      min="1" 
      value={filtro.dataPrice[0].minimo} 
      placeholder='Mínimo' 
      onChange={handleMinimo}
      className={style.selectMinimo }/>

      <input 
      type="number" 
      min="1" 
      value={filtro.dataPrice[0].maximo} 
      placeholder='Máximo' 
      onChange={handleMaximo}
      className={style.selectMaximo}/>

      <button onClick={reset} className={style.resetButton} >
        Reset
      </button>
    </div>
  );
};

export default SearchBar;