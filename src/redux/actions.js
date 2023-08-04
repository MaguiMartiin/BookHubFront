import {
	GET_BOOKS,
	CREATE_BOOK,
	FILTER,
	GET_GENDERS,
	BOOK_ID,
	GET_BOOK_NAME,
	EDIT_BOOK,
	DELETE_BOOK,
	GET_AUTHORS,
	ADD_TO_CART,
	DELETE_FROM_CART,
	REFRESH_CART,
	PUBLICACIONES_ID,
	REMOVE_TO_CART,
	GET_PUNTUATION,
	GET_PUNTUATION_ID,
	GET_OPINION,
	GET_OPINION_ID,
	GET_PURCHASES,
	PERFIL,
  GET_USERS
} from "./action-types";

import axios from "axios";

const token = localStorage.getItem("accessToken");

export const createBook = (payload) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`/`, payload);
			return dispatch({ type: CREATE_BOOK, payload: response.data });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};

export const getAllBooks = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/book`);
			return dispatch({ type: GET_BOOKS, payload: response.data });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};

export const getPuntuation = () => {
  return async (dispatch) => {
    try {
      const puntuation = (await axios.get("/punctuation",  {headers: {
        Authorization: `Bearer ${token}`,
        }})).data
        console.log(puntuation)
      return dispatch ({type: GET_PUNTUATION, payload: puntuation})
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }
}

export const getPuntuationId = (id) => {
	return async (dispatch) => {
		try {
			const puntuation = (await axios.get(`/punctuation/${id}`)).data;
			return dispatch({ type: GET_PUNTUATION_ID, payload: puntuation });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};

export const getOpinion = () => {
  return async (dispatch) => {
    try {
      const opinion = (await axios.get("/comments",  {headers: {
        Authorization: `Bearer ${token}`,
        }})).data
        console.log(opinion)
      return dispatch({type: GET_OPINION, payload: opinion})
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }
}


export const getOpinionId = (id) => {
	return async (dispatch) => {
		try {
			const opinionId = (await axios.get(`/comments/${id}`)).data;
			return dispatch({ type: GET_OPINION_ID, payload: opinionId });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};

export const bookId = (id) => {
	return async function (dispatch) {
		try {
			const bookDetail = (await axios.get(`/book/${id}`)).data;
			return dispatch({ type: BOOK_ID, payload: bookDetail });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};

export const filter = (book) => {
	return async (dispatch) => {
		try {
			let params = {};

			if (book.gender === "gender") {
				params.gender = encodeURIComponent(book.dataGender);
			}

			if (book.author === "author") {
				params.author = encodeURIComponent(book.dataAuthor);
			}

			if (
				book.price === "price" &&
				book.dataPrice[0].minimo &&
				book.dataPrice[0].maximo
			) {
				const minimo = book.dataPrice[0].minimo;
				const maximo = book.dataPrice[0].maximo;
				params.price = `${minimo},${maximo}`;
			}

			if (
				book.releaseDate === "releaseDate" &&
				book.dataReleateDate.length === 2
			) {
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

			const response = await axios.get(`/filter?${queryString}`);
			return dispatch({ type: FILTER, payload: response.data });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};

export const getGenders = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/gender`);
			return dispatch({ type: GET_GENDERS, payload: response.data });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};


// profile
export const getPerfil = () => {
	return async (dispatch) => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.get(`/perfil`, config);

			return dispatch({ type: PERFIL, payload: response.data });
		} catch (error) {
			return {
				error: error.message,
			};
		}
	};
};




export const getAuthor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/author`)
      return dispatch({ type: GET_AUTHORS, payload: response.data });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export const editBook = (id, bookData) => {
  return async function (dispatch) {
    try {
      const bookEdit = await axios.put(`/book/${id}`, bookData)
      return dispatch({ type: EDIT_BOOK, payload: bookEdit.data })
    }
    catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export const bookDelete = (id) => {
  return async function (dispatch) {
    try {
      const bookDelete = (await axios.delete(`/book/${id}`)).data
      return dispatch({ type: DELETE_BOOK, payload: bookDelete })
    }
    catch (error) {
      return {
        error: error.message
      }
    }
  }
}

export const publicId = () => {
  return async function (dispatch) {
    try {
      const bookPublic = (await axios.get("/perfil/myBooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })).data
      return dispatch({ type: PUBLICACIONES_ID, payload: bookPublic })
    } catch (error) { console.log(error) }
  }
}

export const getByAuthor = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/author`)
      return dispatch({ type: GET_AUTHORS, payload: response.data })
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export const getBookByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/book/?name=${name}`);
      return dispatch({ type: GET_BOOK_NAME, payload: response.data });
    } catch (error) {
      return {
        error: error.message,
      };
    }

  }
}

export const getAllPurchases = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/compras`, config);
      return dispatch({ type: GET_PURCHASES, payload: response.data });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}




export const addToCart = (data) => {
  if (data) {
    return { type: ADD_TO_CART, payload: data }

  }
  console.log("cart");

  return { type: REMOVE_TO_CART };
}



export const deleteFromCart = (itemId) => {
  return { type: DELETE_FROM_CART, payload: itemId }
}

export const refreshCart = (cart) => {
  if (cart) {
    return { type: REFRESH_CART, payload: cart }
  }
  console.log("cart");
  return { type: REMOVE_TO_CART };
}

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/user`);
      return dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}

export const searchUsers = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/user?email=${email}`);
      console.log("email", response);
      return dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}

export const suspenderUsers =  (id) => {
  return async (dispatch) => {
    try {
      if(id){
        console.log(">--<",id);
        const response = await axios.put(`/user/${id}/suspend`);
        console.log("suspender", response.data);
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}

export const quitarSuspenderUsers =  (id) => {
  return async (dispatch) => {
    try {
      if(id){
       const response = await axios.put(`/user/${id}/unsuspend`);
      console.log("unsuspender", response.data); 
      }
    
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}

export const eliminarUsers =  (id) => {
  return async (dispatch) => {
    try {
      if(id){
       const response = await axios.delete(`/user/${id}`);
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}

export const adminUsers =  (id) => {
  return async (dispatch) => {
    try {
      if(id){
       const response = await axios.put(`/user/${id}/admin`);
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };
}
