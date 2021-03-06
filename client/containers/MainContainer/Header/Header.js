import React, { Component } from 'react';
import * as LoginAction from 'client/actions/LoginAction';
import Profile from 'client/components/Profile/Profile';

import 'client/containers/MainContainer/Header/header.scss'

class Header extends Component {
    constructor () {
        super();
        this.state = {
            showDetailedBox: false
        }
    }

    toggleDetailedBox(e) {
        this.setState({showDetailedBox: !this.state.showDetailedBox})
    }

    logout(e) {
        LoginAction.logout();
    }

    render () {
        return (
            <header className="header">
                <h1>Registration for courses</h1>
                <Profile user={this.props.user} logoutHandler={this.logout.bind(this)} showDetailedBox={this.state.showDetailedBox} clickHandler={this.toggleDetailedBox.bind(this)}/>
            </header>
        )
    }
}

export default Header;