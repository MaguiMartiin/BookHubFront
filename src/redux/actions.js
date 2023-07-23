import {GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS, GET_BOOK_NAME} from './action-types'
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
          const response = await axios.get(`http://localhost:3001/book`);
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
//       const response = await axios.get('http://localhost:3001/filter', { params: filters });
//       return dispatch({ type: FILTER, payload: response.data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };


export const getGenders = () =>{
  return async (dispatch) =>{
    try {
      const response = await axios.get(`http://localhost:3001/gender`)
      return dispatch({ type: GET_GENDERS, payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}


export const getBookByName = (name) =>{
  return async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/book/?name=${name}`);
        return dispatch({ type: GET_BOOK_NAME, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  }
}