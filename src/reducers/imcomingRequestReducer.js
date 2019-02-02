import {FETCH_IN_COMING_REQUEST} from "../actions/types";


export default (state = [], action) => {
    switch (action.type) {
        case FETCH_IN_COMING_REQUEST:
            return action.payload || null;
        default:
            return state;
    }
};
