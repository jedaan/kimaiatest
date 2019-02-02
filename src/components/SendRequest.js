import React, {Component} from "react";
import PropTypes from 'prop-types';

class SendRequest extends Component {
    state = {
        value: '',
        text: ''
    };

    static contextTypes = {
        router: PropTypes.object
    };

    change = (ev) => {
        this.setState({
            value: ev.target.value,
            text: ev.target.textContent
        });
    };

    onSendRequest = (userId, value, text) => {
        this.props.onRequestSend(userId, value, text);
        this.context.router.history.push("/app")
    };

    render() {
        let {users} = this.props;
        return (
            <div style={{marginTop: 50}}>
                <select name="user" className="select" onChange={this.change}>
                    <option></option>
                    {users.map((user, index) =>
                        <option key={index} value={user.id}>{user.email}</option>
                    )}
                </select>
                <button onClick={() => this.onSendRequest(this.props.userId, this.state.value, this.state.text)}>Send
                    Request
                </button>
            </div>
        );
    }
}


SendRequest.propTypes = {
    users: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    onRequestSend: PropTypes.func.isRequired
};

export default SendRequest;
