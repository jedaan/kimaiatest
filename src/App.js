import React, {Component} from 'react';
import Register from './pages/RegisterPage';
import SignIn from './pages/SignInPage';
import requireAuth from './components/auth/requireAuth';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAuthUser} from './actions/postsAndUserActions';
import SearchFriends from './pages/SearchFriendsPage';
import './components/style/app.css';
import HomePage from './pages/HomePage';
import ManageRequests from './pages/ManageRequestsPage';
import MyPostsPage from './pages/MyPostsPage';


class App extends Component {
    componentWillMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={SignIn}/>
                    <Route exact path="/register" component={Register}/>
                    <Route path="/app" component={requireAuth(HomePage)}/>
                    <Route path="/searchFriends" component={requireAuth(SearchFriends)}/>
                    <Route path="/manageRequests" component={requireAuth(ManageRequests)}/>
                    <Route path="/myPosts" component={requireAuth(MyPostsPage)}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, {fetchUser: fetchAuthUser})(App);
