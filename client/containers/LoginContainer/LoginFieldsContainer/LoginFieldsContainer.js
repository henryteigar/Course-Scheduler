import React, {Component} from 'react';
import './login-fields-container.scss';
import Button from "client/components/Button/Button";
import InputField from "client/components/UnderlinedInputField/UnderlinedInputField";
import CheckBox from "client/components/CheckBox/CheckBox";
import {withRouter} from 'react-router-dom';

class LoginFieldsContainer extends Component {

    handleClick() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="login-fields-container">
                <h2>Sign in with your UT account</h2>
                <div className="input-field">
                    <InputField type="text" placeholder="Username"/>
                </div>

                <div className="input-field">
                    <InputField type="password" placeholder="Password"/>
                </div>

                <div className="checkbox-container">
                    <CheckBox/>
                    <span className="description">Remember me</span>
                </div>

                <div className="button">
                    <Button clickHandler={() => this.handleClick()} class="big green" name="Sign in"/>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginFieldsContainer);