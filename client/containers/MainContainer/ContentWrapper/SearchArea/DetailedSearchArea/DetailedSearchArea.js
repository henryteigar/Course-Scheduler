import React, { Component } from 'react';

import CollapsibleTextButton from "client/components/CollapsibleTextButton/CollapsibleTextButton";

import './detailed-search-area.scss';
import DropdownSelectBox from "../../../../../components/DropdownSelectBox/DropdownSelectBox";

class DetailedSearchArea extends Component {
    constructor() {
        super();
        this.state = {
            isCollapsed: false
        }
    }

    toggleDetailedSearch() {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }

    render() {
        return (
            <div className={"detailed-search-area" + (this.state.isCollapsed ? "" : " opened")}>
                <div className="toggle-button">
                    <CollapsibleTextButton name="Detailed search" collapsed={this.state.isCollapsed}
                                           clickHandler={this.toggleDetailedSearch.bind(this)}/>
                </div>
                <div className="content">  {/*Currently pointless*/}
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                    <DropdownSelectBox />
                </div>

            </div>
        )
    }
}

export default DetailedSearchArea;