import style from './SearchBar.module.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//import { getBookByName } from '../../redux/actions';
//import Swal from 'sweetalert2';
import { filter } from '../../redux/actions';


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
const SearchBar = (props) => {
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
};

export default SearchBar;