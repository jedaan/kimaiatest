import {REQUEST_SENT} from "../actions/types";


export default (state = null, action) => {
    switch (action.type) {
        case REQUEST_SENT:
            return action.payload || null;
        default:
            return state;
    }
};
