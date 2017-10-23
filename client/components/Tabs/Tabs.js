import React, {Component} from 'react';

import Tab from "./Tab";

import './tabs.scss';

class Tabs extends Component {
    constructor(props) {
        super();
        this.state = {
            tabs: props.tabs,
            activeTab: props.activeTab
        };
    }

    handleClick(activeTab) {
        this.setState({activeTab});
    }

    render() {
        let tabs = [];
        for (let key in this.state.tabs) {
            tabs.push(<Tab key={key} value={key} text={this.state.tabs[key]}
                           activeTab={this.state.activeTab}
                           clickHandler={this.handleClick.bind(this)}/>)
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