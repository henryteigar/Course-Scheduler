import React, {Component} from 'react';
import './login-fields-container.scss';
import Button from "client/components/Button/Button";
import InputField from "client/components/UnderlinedInputField/UnderlinedInputField";
import CheckBox from "client/components/CheckBox/CheckBox";
import {withRouter} from 'react-router-dom';
import {login} from "../../../actions/LoginAction";


class LoginFieldsContainer extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }
    }

    handleClick() {
        let credentials = {
            "username": this.state.username,
            "password": this.state.password
        };
        login(credentials).catch((err) => {
            if (err.response.status === 400) {
                console.log("MÕLEMAD ON KOHUSTUSLIKUD")
            } else if (err.response.status === 401) {
                console.log("VALED ANDMED")
            } else {
                console.log("MIDAGI MUUD LÄKS TÄIESTI KATKI")
            }
        })
        /*this.props.history.push("/");*/
    }

    rememberChangeHandler() {
        this.setState({rememberMe: !this.state.rememberMe})
    }

    usernameChangeHandler(e) {
        this.setState({"username": e.target.value})
    }

    passwordChangeHandler(e) {
        this.setState({"password": e.target.value})
    }

    render() {
        return (
            <div className="login-fields-container">
                <h2>Sign in with your UT account</h2>
                <div className="input-field">
                    <InputField type="text" placeholder="Username" changeHandler={this.usernameChangeHandler.bind(this)}/>
                </div>

                <div className="input-field">
                    <InputField type="password" placeholder="Password" changeHandler={this.passwordChangeHandler.bind(this)}/>
                </div>

                <div className="checkbox-container">
                    <label><CheckBox changeHandler={this.rememberChangeHandler.bind(this)} classes="green medium"/>
                    <span className="description">Remember me</span></label>
                </div>

                <div className="button">
                    <Button clickHandler={this.handleClick.bind(this)} class="big green" name="Sign in"/>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginFieldsContainer);