import React, { Component } from 'react';
import 'client/containers/LoginContainer/login-container.scss';
import InputfieldContainer from 'client/containers/LoginContainer/InputfieldContainer/LoginBoard';

class LoginContainer extends Component {
    render() {
        return (
            <div className="loginContainer">
                <img className="logo" src="../../images/ut-logo.svg" />
                <p>University of Tartu Course Scheduler</p>
                <InputfieldContainer/>
            </div>
        )
    }
}
export default LoginContainer;