import React from "react";
import PropTypes from 'prop-types';

const InComingRequest = ({inComingRequest, onAcceptRequest, onRejectRequest}) => {
    return (
        <div>
            <h1>incoming requests :</h1>
            {inComingRequest && inComingRequest.map((req, index) =>
                <div key={index}>
                    <span className="span_link" value={req.id}>{req.email}</span>
                    <span className="span_link" onClick={() => onAcceptRequest(req.id, req.email)}> Accept
                        request</span>
                    <span className="span_link" onClick={() => onRejectRequest(req.id)}> Reject request</span>
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
