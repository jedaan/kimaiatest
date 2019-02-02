import {FETCH_USER, SUCCESS_LOG_IN, SUCCESS_LOG_OUT,FAILED_LOG_IN} from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || null;
        case SUCCESS_LOG_IN:
            return action.payload || null;
        case SUCCESS_LOG_OUT:
            return action.payload || null;
        default:
            return state;
    }
};
