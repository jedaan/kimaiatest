import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {registerUser} from '../actions/authActions';
import connect from 'react-redux/es/connect/connect';

class RegisterPage extends Component {
    state = {
        user: {
            email: '',
            firstName: '',
            confirmPassword: '',
            password: ''
        },
    };

    static contextTypes = {
        router: PropTypes.object
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const {user} = this.state;
        if (user.firstName && user.email && user.password && user.confirmPassword) {
            if (user.password === user.confirmPassword) {
                this.props.handleRegisterUser(user.email, user.password, user.firstName);
            }
        }
    };


    render() {
        let {registered} = this.props;
        return (
            <div>
                {(registered) ?
                    <div>
                        <span>you are successfully registered ..</span>
                        <button onClick={() => this.context.router.history.push("/app")}>Go To Home Page.
                        </button>
                    </div> :
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <button>Register</button>
                        <button onClick={() => {
                            this.context.router.history.push("/");
                        }}>Cancel
                        </button>
                    </form>
                }
            </div>
        );
    }
}

function mapStateToProps({registered}) {
    return {registered};
}


function mapDispatchToProps(dispatch) {
    return ({
        handleRegisterUser: (email,password,name) => {
            dispatch(registerUser(email,password,name));
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
