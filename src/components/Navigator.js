import React from "react";
import PropTypes from "prop-types";

const Navigator = ({router}) => {
    return (
        <div>
            <span className="span_link" onClick={() => {
                router.history.push("/searchFriends");
            }}>Search friends
                </span><span> --- </span>
            <span className="span_link" onClick={() => {
                router.history.push("/manageRequests");
            }}>Manage requests
                </span><span> --- </span>
            <span className="span_link" onClick={() => {
                router.history.push("/myPosts");
            }}>My posts
                </span>
            <br/>
        </div>
    );
};

Navigator.propTypes = {
    router: PropTypes.object.isRequired,
};

export default Navigator;
