import React, {Component} from 'react';
import 'client/containers/LoginContainer/login-container.scss';
import LoginFieldsContainer from 'client/containers/LoginContainer/LoginFieldsContainer/LoginFieldsContainer';

class LoginContainer extends Component {
    render() {
        return (
            <div className="loginContainer">
                <img src="../../images/ut-logo.svg"/>
                <h1>University of Tartu Course Scheduler</h1>
                <LoginFieldsContainer/>
            </div>
        )
    }
}

export default LoginContainer;