import {ADD_POST} from "../actions/types";

export default (state = false, action) => {
    switch (action.type) {
        case ADD_POST:
            return action.payload || null;
        default:
            return state;
    }
};
