import React, {Component} from "react";
import {connect} from "react-redux";
import {
    acceptRequest,
    fetchInComingRequest,
    fetchPendingRequests,
    rejectRequest
} from "../actions/friendsRequestsActions";
import PendingRequest from "../components/PendingRequest";
import InComingRequest from "../components/InComingRequest";

class ManageRequestsPage extends Component {
    state = {
        content: ''
    };

    componentDidMount() {
        this.props.handleFetchPendingRequests();
        this.props.handleFetchInComingRequest();
    }

    render() {
        let {pendingRequests, inComingRequest} = this.props;
        return (
            <div>
                <InComingRequest inComingRequest={inComingRequest}
                                 onAcceptRequest={this.props.handleAcceptRequest}
                                 onRejectRequest={this.props.handleRejectRequest}/>
                <PendingRequest pendingRequests={pendingRequests}/>
            </div>
        );
    }
}

ManageRequestsPage.propTypes = {};

const mapStateToProps = ({pendingRequests, inComingRequest}) => {
    return {
        pendingRequests,
        inComingRequest
    };
};

function mapDispatchToProps(dispatch) {
    return ({
        handleFetchPendingRequests: () => {
            dispatch(fetchPendingRequests());
        },
        handleFetchInComingRequest: () => {
            dispatch(fetchInComingRequest());
        },
        handleAcceptRequest: (id, email) => {
            dispatch(acceptRequest(id, email));
        },
        handleRejectRequest: (id, email) => {
            dispatch(rejectRequest(id, email));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRequestsPage);
