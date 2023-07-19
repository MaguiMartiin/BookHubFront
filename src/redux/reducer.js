import { GET_BOOKS, CREATE_BOOK } from "./action-types"


const initialState = {
    AllBooks: [],
    copyState: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BOOKS:
            return{
                ...state,
                AllBooks: action.payload,
                copyState: action.payload,
            };
        case CREATE_BOOK:
            return{
                ...state,
                AllBooks: [...state.AllBooks, action.payload],
                copyState: [...state.copyState, action.payload]
            }
    }
}

export default rootReducer
