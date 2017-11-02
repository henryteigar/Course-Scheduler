import React, { Component } from 'react';
import 'client/containers/LoginContainer/LoginBoardContainer/loginboard.scss';
import Button from "client/components/Button/Button";
import InputField from "client/components/InputField/InputField";

class InputfieldContainer extends Component {
    render() {
        return (
            <div className="loginBoard">
                <p>Sign in with your UT account</p>
                <div className="input userName_input">
                    <InputField
                        class="input_field"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="input passWord_input">
                    <InputField
                        class="input_field"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="logInButton">
                    <Button class="big green" name="Sign in"/>
                </div>
            </div>
        )
    }
}
export default InputfieldContainer;