import React from "react";
import Avatar from "./Avatar";

const Header = ({user, onLogOut}) => {
    return (
        <div className="header_container">
            <Avatar user={user}/>
            <span className="span_link" onClick={() => onLogOut()}>Log Out</span>
            <h2>Email : {user.email}</h2>
            <br/>
        </div>
    );
};

export default Header;
