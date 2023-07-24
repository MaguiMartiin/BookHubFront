import style from './SearchBar.module.css'
import React from 'react';
import { useEffect, useState } from 'react';
//import { getBookByName } from '../../redux/actions';
//import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux"
import { filter, getAllBooks, getAuthor, getGenders } from '../../redux/actions';


/*const SearchBar = ({copyState, updateFilter}) => {

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
};*/

// busca por nombre
/*const SearchBar = (props) => {
  const dispatch = useDispatch()
  const [name,setName ] = useState({
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
  console.log("props--", props.filtro)
  const handleName = (e) => {
    const {value} = e.target;
    setName({
      ...name,
      author: props.filtro.author, 
      dataAuthor: props.filtro.dataAuthor,
      dataGender: props.filtro.dataGender,
      dataPrice: props.filtro.dataPrice,
      dataReleateDate: props.filtro.dataReleateDate,
      dataSearch: props.filtro.dataSearch,
      gender: props.filtro.gender,
      price: props.filtro.price,
      releaseDate: props.filtro.releaseDate,
      search: "search",  
      dataSearch: value
    })
    //console.log(name)
  }
useEffect(()=>{
  //console.log("name",name)
  dispatch(filter(name))
},[name])


  return (
    <div className={style.searchBarContainer}>
      <form
        className={style.searchBarForm}
      >
        <input
          value={name.dataSearch}
          onChange={handleName}
          className={style.searchBarInput}
          placeholder='BUSCAR LIBROS...'
        />
        
      </form>
    </div>
  );
};*/
const SearchBar = (props) => {
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
    dataSearch: ""
});
  const genders = useSelector((state) => state.genders)
  const authors = useSelector((state) => state.authors)
  console.log("props--", props.filtro)
  const handleName = (e) => {
    const {value} = e.target;
    setFiltro({
      ...filtro,
      search: "search",  
      dataSearch: value
    })
    //console.log(name)
  }
useEffect(()=>{
  //console.log("name",name)
  dispatch(filter(filtro))
},[filtro])


  useEffect(() => {
    dispatch(getGenders());
    dispatch(getAuthor());
  }, [dispatch]);


  const [filterByGender, setFilterByGender] = useState('');
  const [filterByAuthor, setFilterByAuthor] = useState('');
  const [filterByAño, setFilterByAño] = useState('');


 
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
    //console.log(event.target.value)
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
    //console.log("aaa", filtro);
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
      <select id="yearSelect" value={filterByAño} onChange={handleChange1} className={style.selectOrder}>
        <option value="">Año</option>
        {decades.map((decade) => (
          <option key={decade} value={decade.split('-')[0]}>
            {decade}
          </option>
        ))}
      </select>

      <select value={filterByAuthor} className={style.selectOrder} onChange={selectAuthor}>
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

      <button className={style.resetButton} >
        <div className={style.resetButtonContent}>
          <button onClick={reset}>Reset</button>
        </div>
      </button>
    </div>
  );
};

export default SearchBar;