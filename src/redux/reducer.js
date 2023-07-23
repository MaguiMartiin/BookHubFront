import { GET_BOOKS, CREATE_BOOK, FILTER, GET_GENDERS, GET_AUTHOR } from "./action-types"


const initialState = {
    allBooks: [],
    copyState: [],
    genders: [],
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
        case GET_AUTHOR:
            return{
                ...state,
                authors: action.payload,
            };    

        default:
            return state;
    }
}

export default rootReducer
