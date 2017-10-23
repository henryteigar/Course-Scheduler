import React, {Component} from 'react';

import Tab from "./Tab";

import './tabs.scss';

class Tabs extends Component {
    constructor(props) {
        super();
        this.state = {
            tabs: props.tabs,
            selectedTab: props.selectedTab
        };
    }

    render() {
        let tabs = [];
        for (let key in this.state.tabs) {
            tabs.push(<Tab key={key} text={this.state.tabs[key]}/>)
        }
        if (tabs.length === 0) return null;

        return (
            <ul className="tabs">
                {tabs}
            </ul>
        )
    }
}

export default Tabs;