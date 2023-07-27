import {
	GET_BOOKS,
	CREATE_BOOK,
	FILTER,
	GET_GENDERS,
	BOOK_ID,
	GET_BOOK_NAME,
	GET_AUTHORS,
	EDIT_BOOK,
	USERS_SIGN_UP_STEP_SET,
	ADD_TO_CART,
	DELETE_FROM_CART,
	REFRESH_CART
} from "./action-types";

const initialState = {
	allBooks: [],
	copyState: [],
	genders: [],
	bookId: [],
	bookEdit: [],
	authors: [],
	cart: [],

	// user
	signUpStep: 1,
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOOKS:
			return {
				...state,
				allBooks: action.payload,
				copyState: action.payload,
			};
		case CREATE_BOOK:
			return {
				...state,
				allBooks: [...state.allBooks, action.payload],
				copyState: [...state.copyState, action.payload],
			};
		case FILTER:
			return {
				...state,
				copyState: action.payload,
			};
		case GET_GENDERS:
			return {
				...state,
				genders: action.payload,
			};
		case GET_AUTHORS:
			return {
				...state,
				authors: action.payload,
			};

		case BOOK_ID:
			return {
				...state,
				bookId: action.payload,
			};

		case EDIT_BOOK:
			return {
				...state,
				bookEdit: action.payload,
			};

		case GET_BOOK_NAME:
			return {
				...state,
				copyState: action.payload,
			};
		case USERS_SIGN_UP_STEP_SET:
			return { ...state, signUpStep: action.payload };

		case ADD_TO_CART:
			return{
				...state,
				cart: [...state.cart, action.payload],
			}
		case DELETE_FROM_CART:
			const updateItems = state.cart.filter((item) => item.id !== action.payload)
      		return {
        	...state,
        	cart: updateItems,
      		};	
		case REFRESH_CART:
			return {
				...state,
				cart: action.payload,
			}	

		default:
			return state;
	}
};

export default rootReducer;
