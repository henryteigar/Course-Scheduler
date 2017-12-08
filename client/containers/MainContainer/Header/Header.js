import React, { Component } from 'react';

import Profile from 'client/components/Profile/Profile';

import 'client/containers/MainContainer/Header/header.scss'

class Header extends Component {
    constructor () {
        super();
        this.state = {
            name: "John Doe",
            studentId: "B33043",
            email: "john@doe.ut.ee"
        }
    }
    render () {
        return (
            <header className="header">
                <h1>Registration for courses</h1>
                <Profile name={this.state.name} studentId={this.state.studentId} />
            </header>
        )
    }
}

export default Header;