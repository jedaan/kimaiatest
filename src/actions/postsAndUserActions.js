import {authRef, usersRef} from '../config/firebase';
import {
    getAuthUser,
    getAllMyFriends,
    getAllPostsFormMyFriends,
    getAllUsers,
    arrayUnique,
} from './helper';
import {
    FETCH_FRIENDS_POSTS,
    FETCH_MY_POSTS,
    FETCH_USER,
    FETCH_USERS,
    ADD_POST
} from "./types";
import moment from 'moment';

/*
* add new post .
* */
export const addPost = (userId, email, content) => async dispatch => {
    try {
        let now = moment().format("D/M/Y hh:mm:ss");
        usersRef.child(userId + "/myPosts").push({
            content: content,
            publishDate: now,
            email: email,
        });
        dispatch({
            type: ADD_POST,
            payload: true
        });

    } catch (e) {
        console.log('error - addPost', e);
    }
};

/*
* show add new post .
* */
export const showAddNewPost = () => async dispatch => {
    try {
        dispatch({
            type: ADD_POST,
            payload: false
        });
    } catch (e) {
        console.log('error - addPost', e);
    }
};
/*
* fetch auth user .
* */
export const fetchAuthUser = () => dispatch => {
    try {
        authRef.onAuthStateChanged(user => {
            if (user) {
                dispatch({
                    type: FETCH_USER,
                    payload: user
                });
            } else {
                dispatch({
                    type: FETCH_USER,
                    payload: null
                });
            }
        });
    } catch (e) {
        console.log('error - fetchAuthUser', e);
    }
};

/*
* fetch users , get ll un friends users .
* */
export const fetchUsers = () => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let userUid = authUser.uid;
            let userMail = authUser.email;
            let myFriends = await getAllMyFriends(userUid);
            let allUsers = await getAllUsers(userMail);

            let users = arrayUnique(allUsers.concat(myFriends));
            dispatch({
                type: FETCH_USERS,
                payload: users
            });
        }
    } catch (e) {
        console.log('error - fetchUsers', e);
    }
};

/*
* fetch my posts .
* */
export const fetchMyPosts = () => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let uid = authUser.uid;
            let posts = [];
            usersRef.child(uid + "/myPosts").on("value", snapshot => {
                snapshot.forEach(function (data) {
                    let post = {value: data.val(), id: data.key};
                    posts.push(post);
                });
                dispatch({
                    type: FETCH_MY_POSTS,
                    payload: posts
                });
            });
        }
    } catch (e) {
        console.log('error - fetchMyPosts', e);
    }
};

/*
* fetch my friends posts .
* */
export const fetchFriendsPosts = () => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let uid = authUser.uid;
            let myFriends = await getAllMyFriends(uid);
            let friendsMyPost = await getAllPostsFormMyFriends(myFriends);

            //sort array
            friendsMyPost.sort(function (a, b) {
                return new Date(b.publishDate) - new Date(a.publishDate);
            });
            dispatch({
                type: FETCH_FRIENDS_POSTS,
                payload: friendsMyPost
            });
        }
    } catch (e) {
        console.log('error - fetchFriendsPosts', e);
    }
};

/*
* remove my friends posts .
* */
export const removeFriendsPosts = () => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            dispatch({
                type: FETCH_FRIENDS_POSTS,
                payload: []
            });
        }
    } catch (e) {
        console.log('error - removeFriendsPosts', e);
    }
};
