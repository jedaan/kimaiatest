import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signInWithEmail} from '../actions/authActions';
import {fetchUsers} from '../actions/postsAndUserActions';

class SignInPage extends Component {
    state = {
        email: '',
        password: '',
    };

    static contextTypes = {
        router: PropTypes.object
    };


    componentWillUpdate(nextProps) {
        if (nextProps.auth) {
            this.context.router.history.push("/app");
        }
    }

    handleEmailChange = (evt) => {
        this.setState({email: evt.target.value});
    };

    handlePasswordChange = (evt) => {
        this.setState({password: evt.target.value});
    };


    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('ss', this.props);
        this.props.signInWithEmail(this.state.email, this.state.password);
    };


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />

                    <button>Log In</button>
                    <button onClick={() => {
                        this.context.router.history.push("/register");
                    }}>Sign Up
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

function mapDispatchToProps(dispatch) {
    return ({
        signInWithEmail: (email, password) => {
            dispatch(signInWithEmail(email, password));
            dispatch(fetchUsers());
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
