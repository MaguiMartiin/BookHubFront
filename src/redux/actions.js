import {GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS, BOOK_ID, GET_BOOK_NAME, GET_AUTHOR} from './action-types'
import axios from 'axios';

export const createBook = (payload) =>{
  return async (dispatch) =>{
        try {
            const response = await axios.post(`http://localhost:3001/`, payload)
            return dispatch({type: CREATE_BOOK, payload: response.data})
        } catch (error) {
            console.log(error);
        }
    }
  }


export const getAllBooks = () => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`https://servidor-libreria.onrender.com/book`);
          return dispatch({ type: GET_BOOKS, payload: response.data });
        } catch (error) {
          console.log(error);
        }
      };
}

export const bookId = (id) => {
  return async function (dispatch){
    try{
      const bookDetail = (await axios.get(`https://servidor-libreria.onrender.com/book/${id}`)).data
      return dispatch ({type: BOOK_ID, payload: bookDetail})
    }
    catch(error){console.log(error)}
  }
}
  
  export const filter = (book) => {
    return async (dispatch) => {
      try {
        console.log("--->", book.search);
  
        let params = {};
  
        if (book.gender === "gender") {
          params.gender = encodeURIComponent(book.dataGender);
        }
  
        if (book.author === "author") {
          params.author = encodeURIComponent(book.dataAuthor);
        }
  
        if (book.price === "price" && book.dataPrice[0].minimo && book.dataPrice[0].maximo) {
          const minimo = book.dataPrice[0].minimo;
          const maximo = book.dataPrice[0].maximo;
          params.price = `${minimo},${maximo}`;
        }
  
        if (book.releaseDate === "releaseDate" && book.dataReleateDate.length === 2) {
          const startDate = encodeURIComponent(book.dataReleateDate[0]);
          const endDate = encodeURIComponent(book.dataReleateDate[1]);
          params.releaseDate = `${startDate},${endDate}`;
        }
  
        if (book.search === "search") {
          params.search = encodeURIComponent(book.dataSearch);
        }
  
        const queryString = Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
  
        const response = await axios.get(`http://localhost:3001/filter?${queryString}`);
        //console.log("filter", response.data)
        return dispatch({ type: FILTER, payload: response.data });
      } catch (error) {
        console.log("error", error);
      }
    };
  };
  


export const getGenders = () =>{
  return async (dispatch) =>{
    try {
      const response = await axios.get(`https://servidor-libreria.onrender.com/gender`)
      return dispatch({ type: GET_GENDERS, payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}

export const getAuthor = () =>{
  return async (dispatch) =>{
    try {
      const response = await axios.get(`http://localhost:3001/author`)
      return dispatch({ type: GET_AUTHOR, payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}





/*{
  id: "75c44a7b-179b-47de-8a85-058c52cec84c",
  name: "balada de pajaros cantores de la vida",
  image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
  description: "El libro fue anunciado el 16 de junio de 2019 en la New York Comic Con por Scholastic Press. La autora anunció en un comunicado que volvería a los años posteriores a los llamados Días Oscuros, la rebelión fallida en Panem. La portavoz de su editorial, Tracy van Straaten, rechazó hacer comentarios sobre el contenido del nuevo libro o sobre personajes destacados más allá de lo descrito en el primer anuncio oficial.",
  price: 1250,
  available: 40,
  releaseDate: "2019-06-16T00:00:00.000Z",
  createdAt: "2023-07-19T14:50:37.411Z",
  updatedAt: "2023-07-19T14:50:37.446Z",
  deletedAt: null,
  venta_user_id: null,
  AuthorId: 2,
  GenderId: 7,
  Author: {
    id: 2,
    name: "Stephen King"
  },
  Gender: {
    id: 7,
    name: "Terror"
  }
}
*/

export const getBookByName = (name) =>{
  return async (dispatch) => {
    try {
        const response = await axios.get(`https://servidor-libreria.onrender.com/book/?name=${name}`);
        return dispatch({ type: GET_BOOK_NAME, payload: response.data });
    } catch (error) {
      console.log(error);
    }

  }
}