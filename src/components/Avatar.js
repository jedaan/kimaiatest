import React from "react";
import PropTypes from 'prop-types';
import DefaultAvatarIcon from './svg/DefaultAvatarIcon';

const Avatar = ({user}) => {
    return (
        <div>
            {getUserAvatar(user.photoURL)}
        </div>
    );
};

function getUserAvatar(photoURL) {
    let loggedImg;
    if (photoURL === null) {
        loggedImg = <DefaultAvatarIcon/>;
    } else {
        loggedImg = <img className="avatar_container" alt="img" src={photoURL}/>;
    }
    return (
        <div>
            {loggedImg}
        </div>
    );
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired
};

export default Avatar;
