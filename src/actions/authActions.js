import {authRef, usersRef} from '../config/firebase';
import {REGISTER_USER, SUCCESS_LOG_IN, SUCCESS_LOG_OUT, FAILED_LOG_IN} from './types';

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
        }).catch(function (error) {
            let logInStatus = 'failed';
            dispatch({
                type: FAILED_LOG_IN,
                payload: logInStatus
            });
        });
    } catch (e) {
        console.log('error - signInWithEmail ', e.message);
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
            console.log('error -- registerUser ', error);
        });
    } catch (e) {
        console.log('error -- registerUser ', e.message);
    }
};

/*
* sign out action .
* */
export const signOut = () => dispatch => {
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
            console.log('error -- signOut ', error);
        });
};
