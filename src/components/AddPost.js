import React, {Component} from "react";
import {connect} from "react-redux";
import {addPost} from "../actions/postsAndUserActions";

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
        return (
            <div>
                <textarea rows="4" cols="50" value={this.state.content}
                          onChange={(e) => this.setState({content: e.target.value})}/>
                <button onClick={() => this.addPost()}> Add
                    Post
                </button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        handleAddPost: (userId, email, content) => {
            dispatch(addPost(userId, email, content));
        },
    })
}


export default connect(null, mapDispatchToProps)(AddPost);
