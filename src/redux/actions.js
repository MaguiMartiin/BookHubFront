import {GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS} from './action-types'
import axios from 'axios';

export const getAllBooks = () => {
  return (dispatch) => {
    setTimeout(() => {
      const singleBook =  [
        {
          name: "Product Aaaaaa",
          price: 24.99,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2019,
          Gender: { "name": "Accion" }
        },
        {
          name: "Product Bbbbadbbb",
          price: 39.95,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2018,
          Gender: { "name": "Accion" }
        },
        {
          name: "Product Cccvcc",
          price: 12.49,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2017,
          Gender: { "name": "Aventura" }
        },
        {
          name: "Product Ddasdddd",
          price: 59.99,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2016,
          Gender: { "name": "ciencia ficción" }
        },
        {
          name: "Product Eeeasddee",
          price: 18.75,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2015,
          Gender: { "name": "misterio" }
        },
        {
          name: "Product Fffaff",
          price: 34.95,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2014,
          Gender: { "name": "misterio" }
        },
        {
          name: "Product Gggdggg",
          price: 9.99,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2013,
          Gender: { "name": "Suspenso" }
        },
        {
          name: "Product Hhasdshh",
          price: 49.50,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2012,
          Gender: { "name": "Female" }
        },
        {
          name: "Product Iiiii",
          price: 29.99,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2011,
          Gender: { "name": "Romance" }
        },
        {
          name: "Product Jjsdasjj",
          price: 15.25,
          image: "https://images.cdn1.buscalibre.com/fit-in/360x360/fd/d6/fdd63c483d85776e32e397d1fdd108f7.jpg",
          releaseDate: 2010,
          Gender: { "name": "Terror" }
        }
      ]
      
      dispatch({ type: GET_BOOKS, payload: singleBook });
    }, 1100);
  };
};
// export const getAllBooks = () => {
//     return async (dispatch) => {
//         try {
//           const response = await axios.get(`http://localhost:3001/book`);
//           return dispatch({ type: GET_BOOKS, payload: response.data });
//         } catch (error) {
//           console.log(error);
//         }
//       };
// }




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

  
  export const filter = (book) =>{
  return { type: FILTER, payload:book };
};



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
};*/

// const repeatedBooks = Array(18).fill(singleBook);