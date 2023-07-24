import {GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS, BOOK_ID, GET_BOOK_NAME, EDIT_BOOK, DELETE_BOOK, GET_AUTHORS} from './action-types'

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
       // console.log("--->", book);
  
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
  
        const response = await axios.get(`https://servidor-libreria.onrender.com/filter?${queryString}`);
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
      const response = await axios.get(`https://servidor-libreria.onrender.com/author`)
      return dispatch({ type: GET_AUTHORS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }
}

export const editBook = (id, bookData) => {
  return async function (dispatch){
    try{
      const bookEdit = await axios.put(`https://servidor-libreria.onrender.com/book/${id}`, bookData)
      return dispatch ({type: EDIT_BOOK, payload: bookEdit.data})
    }
    catch(error){console.log(error)}
  }
}

export const bookDelete = (id) => {
  return async function (dispatch){
    try{
      const bookDelete = (await axios.delete(`https://servidor-libreria.onrender.com/book/${id}`)).data
      return dispatch ({type: DELETE_BOOK, payload: bookDelete})
    }
    catch(error){console.log(error)}
  }
}



export const getByAuthor = (name) =>{
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://servidor-libreria.onrender.com/author`)
      return dispatch({ type: GET_AUTHORS, payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}

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