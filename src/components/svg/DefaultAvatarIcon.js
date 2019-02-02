import React from 'react';
import PropTypes from 'prop-types';

const DefaultAvatarIcon = ({size, ...props}) => (
    <svg viewBox="0 0 40 40" fill="currentColor" width={size || "40"} height={size || "40"} {...props}>
        <defs>
            <circle id="a" cx="20" cy="20" r="20"/>
        </defs>
        <g fill="none" fillRule="evenodd">
            <mask id="b" fill="#fff">
                <use xlinkHref="#a"/>
            </mask>
            <use fill="#FAFAFA" xlinkHref="#a"/>
            <g fill="#D9D9D9" mask="url(#b)">
                <g transform="translate(5 10)">
                    <circle cx="15.5" cy="7.5" r="7.5"/>
                    <circle cx="15" cy="32" r="15"/>
                </g>
            </g>
        </g>
    </svg>
);
DefaultAvatarIcon.displayName = 'DefaultAvatarIcon';
DefaultAvatarIcon.propTypes = {
    size: PropTypes.string
};
export default DefaultAvatarIcon;
