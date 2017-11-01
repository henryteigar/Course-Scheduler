import React, { Component } from 'react';
import 'client/containers/LoginContainer/InputfieldContainer/loginboard.scss';
import Button from "client/components/Button/Button";

class InputfieldContainer extends Component {
    render() {
        return (
            <div className="loginBoard">
                <p>Sign in with your UT account</p>
                <div className="logInButton">
                    <Button class="green_login" name="Sign in"/>
                </div>
            </div>
        )
    }
}
export default InputfieldContainer;