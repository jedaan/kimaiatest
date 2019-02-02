import {FETCH_FRIENDS_POSTS} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_FRIENDS_POSTS:
            return action.payload || null;
        default:
            return state;
    }
};
