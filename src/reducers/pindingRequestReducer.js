import {FETCH_PENDING_REQUEST} from "../actions/types";


export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PENDING_REQUEST:
            return action.payload || null;
        default:
            return state;
    }
};
