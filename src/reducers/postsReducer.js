import {FETCH_MY_POSTS} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_MY_POSTS:
            return action.payload || null;
        default:
            return state;
    }
};
