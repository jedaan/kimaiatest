import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";

const initState = {
    auth: null,
    users: [],
    myPosts: [],
    failedLogInStatus: false,
    postAdded: false,
    requestSent: false,
    myFriends: [],
    pendingRequests: [],
    friendsPosts: [],
    inComingRequest: [],
    registered: false
};
const store = createStore(reducers, initState, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
