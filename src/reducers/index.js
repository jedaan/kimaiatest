import {combineReducers} from "redux";
import auth from "./authReducer";
import users from "./usersReducer";
import requestSent from "./sentRequestReducer";
import pendingRequests from "./pindingRequestReducer";
import friendsPosts from "./friendsPostsReducer"
import myFriends from './myFriendsReducer';
import failedLogInStatus from './failedLogInStatusReducer';
import inComingRequest from "./imcomingRequestReducer";
import myPosts from "./postsReducer";
import registered from "./registerReducer";
import postAdded from './psotsShowReducer';

export default combineReducers({
    auth,
    users,
    myPosts,
    failedLogInStatus,
    postAdded,
    requestSent,
    myFriends,
    pendingRequests,
    friendsPosts,
    inComingRequest,
    registered
});
