import React, { Component } from 'react';
import 'client/containers/LoginContainer/LoginBoardContainer/login-board.scss';
import Button from "client/components/Button/Button";
import InputField from "client/components/InputField/InputField";
import CheckBox from "client/components/CheckBox/CheckBox";
import { withRouter } from 'react-router-dom';

class LoginBoard extends Component {

    handleClick() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="loginBoard">
                <p className="sign_in_message">Sign in with your UT account</p>
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
                <div className="checkBox_container">
                    <CheckBox/>
                    <p className="remember_me_message">Remember me</p>
                </div>
                <div className="logInButton">
                    <Button clickHandler={() => this.handleClick()} class="big green" name="Sign in"/>
                </div>
            </div>
        )
    }
}
export default withRouter(LoginBoard);