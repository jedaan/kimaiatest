import React from "react";
import PropTypes from "prop-types";

const FriendsPosts = ({popsts, onFetchFriendsPosts}) => {
    return (
        <div className="friends_posts">
            Friends Posts :

            <span className="span_link" onClick={() => {
                onFetchFriendsPosts()
            }}> Reload posts </span>

            {(popsts) ? popsts.map((post, index) =>
                    <div key={index}>
                        <span className="post_content">{post.content}</span>
                        <span className="post_data">{post.publishDate}</span>
                        <span className="post_email"> -- {post.author}</span>
                    </div>
                ) :
                <div> There is no posts from your friends .</div>
            }
        </div>
    );
};

FriendsPosts.propTypes = {
    popsts: PropTypes.array.isRequired,
    onFetchFriendsPosts: PropTypes.func.isRequired
};

export default FriendsPosts;
