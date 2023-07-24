import { GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS, BOOK_ID, GET_BOOK_NAME, EDIT_BOOK, GET_AUTHORS  } from "./action-types"


const initialState = {
    allBooks: [],
    copyState: [],
    genders: [],
    bookId: [],
    bookEdit: [],
    authors: [],
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BOOKS:
            return{
                ...state,
                allBooks: action.payload,
                copyState: action.payload,
            };
        case CREATE_BOOK:
            return{
                ...state,
                allBooks: [...state.allBooks, action.payload],
                copyState: [...state.copyState, action.payload]
            };
        case FILTER:
            return{
                ...state,
                copyState: action.payload,
            };    
        case GET_GENDERS:
            return{
                ...state,
                genders: action.payload,
            };    
        case GET_AUTHORS:
            return{
                ...state,
                authors: action.payload,
            };    

        case BOOK_ID:
            return{
                ...state, 
                bookId: action.payload};

        case EDIT_BOOK:
            return{
                ...state,
                bookEdit: action.payload
            };

        case GET_BOOK_NAME:
            return{
                ...state,
                copyState: action.payload,
            };

        default:
            return state;
    };
}


export default rootReducer
