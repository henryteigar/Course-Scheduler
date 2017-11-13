import React, {Component} from 'react';

import './tabs.scss';

class Tabs extends Component {
    constructor(props) {
        super();
        this.state = {
            tabs: props.tabs,
            activeTab: props.activeTab,
            changeTabHandler: props.changeTabHandler
        };
    }

    tabClickHandler(e) {
        let targetTab = e.target.id;

        if (targetTab !== this.state.activeTab) {
            this.setState({activeTab: targetTab});
            this.state.changeTabHandler(targetTab);
        }
    }

    render() {
        if (this.state.tabs.length === 0) return null;

        return (
            <ul className="tabs">
                {Object.keys(this.state.tabs).map((tabValue) =>
                    <li onClick={this.tabClickHandler.bind(this)} id={tabValue} key={tabValue}
                        className={(tabValue === this.state.activeTab) ? `tab active` : `tab`}>
                        {this.state.tabs[tabValue]}
                    </li>
                )}
            </ul>
        )
    }
}

export default Tabs;