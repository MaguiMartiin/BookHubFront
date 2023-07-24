import {GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS, BOOK_ID, GET_BOOK_NAME, EDIT_BOOK} from './action-types'
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

  
  export const filter = (book) =>{
  return { type: FILTER, payload:book };
};

// export const filterBooks = (filters) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get('https://servidor-libreria.onrender.com/filter', { params: filters });
//       return dispatch({ type: FILTER, payload: response.data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };


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

export const bookId = (id) => {
  return async function (dispatch){
    try{
      const bookDetail = (await axios.get(`https://servidor-libreria.onrender.com/book/${id}`)).data
      return dispatch ({type: BOOK_ID, payload: bookDetail})
    }
    catch(error){console.log(error)}
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