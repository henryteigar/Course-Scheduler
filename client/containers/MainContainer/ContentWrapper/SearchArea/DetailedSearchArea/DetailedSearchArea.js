import React, { Component } from 'react';

import CollapsibleTextButton from "client/components/CollapsibleTextButton/CollapsibleTextButton";

import './detailed-search-area.scss';

class DetailedSearchArea extends Component {
    constructor() {
        super();
        this.state = {
            isCollapsed: true
        }
    }

    toggleDetailedSearch() {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }

    render() {
        return (
            <div className={"detailed-search-area" + (this.state.isCollapsed ? "" : " opened")}>
                <CollapsibleTextButton name="Detailed search" collapsed={this.state.isCollapsed}
                                       clickHandler={this.toggleDetailedSearch.bind(this)}/>
            </div>
        )
    }
}

export default DetailedSearchArea;