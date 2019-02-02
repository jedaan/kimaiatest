import React, {Component} from "react";
import {connect} from "react-redux";
import SendRequest from '../components/SendRequest';
import {fetchUsers} from '../actions/postsAndUserActions';
import {sendFriendRequest} from "../actions/friendsRequestsActions";

class SearchFriendsPage extends Component {

    componentDidMount() {
        this.props.handleFetchAllUsers();
    }

    render() {
        let {users} = this.props;
        return (
            <div>
                All users .
                <SendRequest userId={this.props.authenticated.uid}
                             users={users}
                             onRequestSend={this.props.handleSendFriendRequest}/>

            </div>
        );
    }
}


const mapStateToProps = ({users}) => {
    return {
        users,
    };
};


function mapDispatchToProps(dispatch) {
    return ({
        handleFetchAllUsers: () => {
            dispatch(fetchUsers())
        },
        handleSendFriendRequest: (userId, requestId, requestMail) => {
            dispatch(sendFriendRequest(userId, requestId, requestMail))
        },
    });
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchFriendsPage);
