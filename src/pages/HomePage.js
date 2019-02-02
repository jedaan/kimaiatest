import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import AddPost from '../components/AddPost';
import Navigator from '../components/Navigator';
import FriendsPosts from '../components/FriendsPosts';
import {fetchFriendsPosts, removeFriendsPosts} from "../actions/postsAndUserActions";
import {usersRef} from "../config/firebase";
import {fetchInComingRequest, fetchPendingRequests} from "../actions/friendsRequestsActions";

class HomePage extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        let me = this;
        usersRef.on('child_changed', function (snapshot) {
            setTimeout(() => {
                console.log('snapshot', snapshot);
                me.props.handleDataChanged();
            }, 1000);
        });
    }

    componentDidMount() {
        this.props.handleFetchFriendsPosts();
        this.props.handleDataChanged();
    }

    render() {
        let {friendsPosts} = this.props;
        return (
            <div>
                <Navigator router={this.context.router}/>

                <div className="add_post_container">
                    <AddPost authenticated={this.props.authenticated}/>
                </div>

                <FriendsPosts popsts={friendsPosts} onFetchFriendsPosts={this.props.handleFetchFriendsPosts}/>
            </div>
        );
    }
}

const mapStateToProps = ({friendsPosts}) => {
    return {
        friendsPosts
    };
};


function mapDispatchToProps(dispatch) {
    return ({
        handleFetchFriendsPosts: () => {
            dispatch(removeFriendsPosts());
            dispatch(fetchFriendsPosts());
        },
        handleDataChanged: () => {
            dispatch(removeFriendsPosts());
            dispatch(fetchFriendsPosts());
            dispatch(fetchPendingRequests());
            dispatch(fetchInComingRequest());
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
