import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header';
import {signOut} from '../../actions/authActions';

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount() {
            if (this.props.authenticated === null) {
                this.context.router.history.push("/");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.history.push("/");
            }
        }

        render() {
            if (this.props.authenticated) {
                return <div>
                    <Header user={this.props.authenticated} onLogOut={this.props.handleLogOut}/>
                    <ComposedComponent {...this.props} />
                </div>;
            }
            return null;
        }
    }

    function mapStateToProps(state) {
        return {authenticated: state.auth};
    }

    function mapDispatchToProps(dispatch) {
        return ({
            handleLogOut: () => {
                dispatch(signOut());
            },

        });
    }

    return connect(mapStateToProps,mapDispatchToProps)(Authentication);
}
