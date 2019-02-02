import React, {Component} from "react";
import {fetchMyPosts} from "../actions/postsAndUserActions";
import {connect} from "react-redux";

class MyPostsPage extends Component {

    componentDidMount() {
        this.props.handleFetchMyPosts();
    }

    render() {
        let {myPosts} = this.props;
        return (
            <div>
                {(myPosts && myPosts.length > 0) ?
                    <ul>
                        {myPosts.map((post, index) =>
                            <li key={index}>{post.value.content} -- <span>{post.value.publishDate}</span></li>)}
                    </ul>
                    :
                    <span> You have no posts yet !!!.</span>
                }
            </div>
        );
    }
}


const mapStateToProps = ({myPosts}) => {
    return {
        myPosts,
    };
};

function mapDispatchToProps(dispatch) {
    return ({
        handleFetchMyPosts: () => {
            dispatch(fetchMyPosts());
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsPage);
