import { GET_USER_DETAILS } from "../actions/types";

const initialState = {
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USER_DETAILS:
            return action.payload

        default:
            return state;
    }
}