import {authRef, usersRef} from '../config/firebase';
import {REGISTER_USER, SUCCESS_LOG_IN, SUCCESS_LOG_OUT} from './types';

/*
* sign in action .
* */
export const signInWithEmail = (email, password) => dispatch => {
    try {
        authRef.signInWithEmailAndPassword(email, password).then(response => {
            let user = response.user;
            dispatch({
                type: SUCCESS_LOG_IN,
                payload: user
            });
        });
    } catch (e) {
        console.log(e.message);
    }
};

/*
* register action .
* for this test we need to save email
* */
export const registerUser = (email, password, name) => dispatch => {
    try {
        authRef.createUserWithEmailAndPassword(email, password).then((response) => {
            let registered = true;
            usersRef.child(response.user.uid).push({email: response.user.email, name: name}).then(() => {
                dispatch({
                    type: REGISTER_USER,
                    payload: registered
                });
            });
        }, (error) => {
            console.log('error', error);
        });
    } catch (e) {
        console.log(e.message);
    }
};

/*
* sign out action .
* */
export const signOut = () => dispatch => {
    debugger;
    authRef.signOut()
        .then(() => {
            dispatch({
                type: SUCCESS_LOG_OUT,
                payload: null
            });
            dispatch({
                type: REGISTER_USER,
                payload: null
            });
        })
        .catch(error => {
            console.log(error);
        });
};
