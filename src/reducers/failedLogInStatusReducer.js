import {FAILED_LOG_IN} from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case FAILED_LOG_IN:
            return action.payload || null;
        default:
            return state;
    }
};
