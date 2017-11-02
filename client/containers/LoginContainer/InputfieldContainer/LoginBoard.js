import React, { Component } from 'react';
import 'client/containers/LoginContainer/InputfieldContainer/loginboard.scss';
import Button from "client/components/Button/Button";
import InputField from "client/components/InputField/InputField";

class InputfieldContainer extends Component {
    render() {
        return (
            <div className="loginBoard">
                <p>Sign in with your UT account</p>
                <div className="userName_input">
                    <InputField
                        class="userName_input_field"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="passWord_input">
                    <InputField
                        class="password_input_field"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="logInButton">
                    <Button class="green_login" name="Sign in"/>
                </div>
            </div>
        )
    }
}
export default InputfieldContainer;