import {FRIEND_REQUEST_ACCEPTED} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case FRIEND_REQUEST_ACCEPTED:
            return action.payload;
        default:
            return state;
    }
};
