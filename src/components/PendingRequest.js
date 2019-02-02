import React from "react";
import PropTypes from 'prop-types';

const PendingRequest = ({pendingRequests}) => {
    return (
        <div>
            <h2>pending requests : </h2>
            {pendingRequests && pendingRequests.map((req, index) =>
                <div key={index}>
                    <span className="span_link" value={req.id}>{req.email}</span>
                </div>
            )}
        </div>
    );
};

PendingRequest.propTypes = {
    pendingRequests: PropTypes.array.isRequired,
};

export default PendingRequest;
