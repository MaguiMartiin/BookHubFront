import {GET_BOOKS, CREATE_BOOK,} from './action-types'
import axios from 'axios';

export const getAllBooks = () => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`http://localhost:3001/`);
          return dispatch({ type: GET_BOOKS, payload: response.data });
        } catch (error) {
          console.log(error);
        }
      };
}

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