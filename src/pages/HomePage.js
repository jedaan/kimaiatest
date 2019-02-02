import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import AddPost from '../components/AddPost';
import {fetchFriendsPosts, removeFriendsPosts} from "../actions/postsAndUserActions";

class HomePage extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.props.handleFetchFriendsPosts();
    }

    render() {
        let {friendsPosts} = this.props;
        return (
            <div>
                <span className="span_link" onClick={() => {
                    this.context.router.history.push("/searchFriends");
                }}>Search friends
                </span><span> --- </span>
                <span className="span_link" onClick={() => {
                    this.context.router.history.push("/manageRequests");
                }}>Manage requests
                </span><span> --- </span>
                <span className="span_link" onClick={() => {
                    this.context.router.history.push("/myPosts");
                }}>My posts
                </span>
                <br/>
                <div className="add_post_container">
                    <AddPost authenticated={this.props.authenticated}/>
                </div>
                <div className="friends_posts">
                    Friends Posts : <span className="span_link" onClick={() => {
                    this.props.handleFetchFriendsPosts()
                }}> Reload posts </span>
                    {(friendsPosts) ? friendsPosts.map((post, index) =>
                            <div key={index}>
                                <span className="post_content">{post.content}</span>
                                <span className="post_data">{post.publishDate}</span>
                                <span className="post_email"> -- {post.author}</span>
                            </div>
                        ) :
                        <div> There is no posts from your friends .</div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({friendsPosts}) => {
    return {
        friendsPosts
    };
};


function mapDispatchToProps(dispatch) {
    return ({
        handleFetchFriendsPosts: () => {
            dispatch(removeFriendsPosts())
            dispatch(fetchFriendsPosts());
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
