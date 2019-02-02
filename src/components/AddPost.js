import React, {Component} from "react";
import {connect} from "react-redux";
import {addPost, showAddNewPost} from "../actions/postsAndUserActions";

class AddPost extends Component {
    state = {
        content: ''
    };

    addPost = () => {
        let {authenticated} = this.props;
        this.props.handleAddPost(authenticated.uid, authenticated.email, this.state.content)
        this.setState({content: ''});
    };

    render() {
        let {postAdded} = this.props;
        debugger;
        return (
            <div>
                {(postAdded) ? <div>your post added press
                        <span className="span_link" onClick={() => {
                            this.props.handleShowAddNewPost()
                        }}>here</span> to add new post </div>
                    :
                    <div>
                    <textarea rows="4" cols="50" value={this.state.content}
                              onChange={(e) => this.setState({content: e.target.value})}/>
                        <button onClick={() => this.addPost()}>
                            Add Post
                        </button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({postAdded}) => {
    return {
        postAdded
    };
};


function mapDispatchToProps(dispatch) {
    return ({
        handleAddPost: (userId, email, content) => {
            dispatch(addPost(userId, email, content));
        },
        handleShowAddNewPost: () => {
            dispatch(showAddNewPost());
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
