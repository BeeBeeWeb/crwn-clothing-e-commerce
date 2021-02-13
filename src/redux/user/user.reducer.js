import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

// state here is current state, 
// and action is object with 'type' and 'payload' properties
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;