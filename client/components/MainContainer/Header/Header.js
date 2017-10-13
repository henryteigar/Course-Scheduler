import React, { Component } from 'react';

import Profile from './Profile/Profile';

import '../../../css/components/header.scss'

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Ainetele registreerumine</h1>
                <Profile />
                <input placeholder="Otsi..."/>
            </header>
        )
    }
}

export default Header;