import React, {Component} from 'react';

import './collapsible-text-button.scss'
import Ionicon from 'react-ionicons'

class CollapsibleTextButton extends Component {

    render() {
        return (
            <button className="collapsible-text-button" onClick={this.props.clickHandler}>
                <Ionicon className={"icon" + (this.props.collapsed ? " collapsed" : " opened")} color="#385A7C"
                         icon="ion-chevron-left"/>
                {this.props.name}
            </button>
        );
    }
}

export default CollapsibleTextButton;