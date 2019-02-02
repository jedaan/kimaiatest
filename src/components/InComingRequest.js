import React from "react";
import PropTypes from 'prop-types';

const InComingRequest = ({inComingRequest, onAcceptRequest, onRejectRequest}) => {
    return (
        <div>
            <h1>incoming requests :</h1>
            {inComingRequest && inComingRequest.map((req, index) =>
                <div key={index}>
                    <span value={req.id}>{req.email}</span>
                    <span onClick={() => onAcceptRequest(req.id, req.email)}> Accept
                        request</span>
                    <span onClick={() => onRejectRequest(req.id)}> Reject request</span>
                </div>
            )}
        </div>
    );
};

InComingRequest.propTypes = {
    inComingRequest: PropTypes.array.isRequired,
    onAcceptRequest: PropTypes.func.isRequired,
    onRejectRequest: PropTypes.func.isRequired,

};

export default InComingRequest;
