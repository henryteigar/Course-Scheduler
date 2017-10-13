import React, { Component } from 'react';

import '../../css/components/sidebar.scss'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <img className="logo" src="../../images/ut-logo.svg" />
            </div>
        )
    }
}

export default Sidebar;