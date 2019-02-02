import {combineReducers} from "redux";
import auth from "./authReducer";
import users from "./usersReducer";
import requestSent from "./sentRequestReducer";
import pendingRequests from "./pindingRequestReducer";
import friendsPosts from "./friendsPostsReducer"
import myFriends from './myFriendsReducer';
import inComingRequest from "./imcomingRequestReducer";
import myPosts from "./postsReducer";
import registered from "./registerReducer";

export default combineReducers({
    auth,
    users,
    myPosts,
    requestSent,
    myFriends,
    pendingRequests,
    friendsPosts,
    inComingRequest,
    registered
});
