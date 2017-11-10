import React, {Component} from 'react';

import './collapsible-text-button.scss'
import Ionicon from 'react-ionicons'

class CollapsibleTextButton extends Component {
    constructor(props) {
        console.log(props.collapsed)
        super();
    }

    render() {
        return (
            <button className="collapsible-text-button" onClick={this.props.clickHandler}>
                <Ionicon className={this.props.collapsed ? "icon icon-collapsed" : "icon icon-opened"} color="#385A7C"
                         icon="ion-chevron-left"/>
                {this.props.name}
            </button>
        );
    }
}

export default CollapsibleTextButton;