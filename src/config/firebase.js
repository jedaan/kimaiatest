import * as firebase from "firebase";
import {FirebaseConfig} from "../config/keys";

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const usersRef = databaseRef.child("users");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
