import {usersRef} from '../config/firebase';
import {
    getAuthUser,
    getIncomingRequests,
    removeRequestKeys
} from './helper';
import {
    FETCH_IN_COMING_REQUEST,
    FETCH_PENDING_REQUEST,
    REQUEST_SENT
} from "./types";

/*
* accept friend request .
* */
export const acceptRequest = (id, email) => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let authUid = authUser.uid;
            let authEmail = authUser.email;
            usersRef.child(authUid + "/myFriends").push({id, email});
            await removeRequestKeys(authUid, id);
            usersRef.child(id + "/myFriends").push({id: authUid, email: authEmail})

            let inComingRequest = await getIncomingRequests(authUser);
            dispatch({
                type: FETCH_IN_COMING_REQUEST,
                payload: inComingRequest
            });
        }
    } catch (e) {
        console.log('error - acceptRequest', e);
    }
};


/*
* send friend request .
* */
export const sendFriendRequest = (userId, requestUserId, requestMail) => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let email = authUser.email;
            usersRef.child(userId + '/sendRequests').push({requestUserId, email: requestMail}).then(() => {
                usersRef.child(requestUserId + '/incomingRequests').push({email: email, id: userId}).then(() => {
                    dispatch({
                        type: REQUEST_SENT,
                        payload: requestUserId
                    });

                });
            });
        }
    } catch (e) {
        console.log('error - sendFriendRequest', e);
    }
};

/*
* reject friend request .
* */
export const rejectRequest = (id, email) => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let authUid = authUser.uid;
            await removeRequestKeys(authUid, id);

            let inComingRequest = await getIncomingRequests(authUser);
            dispatch({
                type: FETCH_IN_COMING_REQUEST,
                payload: inComingRequest
            });
        }
    } catch (e) {
        console.log('error - rejectRequest', e);
    }
};

/*
* fetch pending requests .
* */
export const fetchPendingRequests = () => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let users = [];
            let uid = authUser.uid;
            usersRef.child(uid + "/sendRequests").on("value", snapshot => {
                snapshot.forEach(function (data) {
                    let user = {email: data.val().email, uid: data.val().requestUserId, id: data.key};
                    users.push(user);
                });
                dispatch({
                    type: FETCH_PENDING_REQUEST,
                    payload: users
                });
            });
        }
    } catch (e) {
        console.log('error - fetchPendingRequests', e);
    }
};

/*
* fetch incoming requests .
* */
export const fetchInComingRequest = () => async dispatch => {
    try {
        let authUser = await getAuthUser();
        if (authUser !== null) {
            let inComingRequest = await getIncomingRequests(authUser);
            dispatch({
                type: FETCH_IN_COMING_REQUEST,
                payload: inComingRequest
            });
        }
    } catch (e) {
        console.log('error - fetchInComingRequest', e);
    }
};
