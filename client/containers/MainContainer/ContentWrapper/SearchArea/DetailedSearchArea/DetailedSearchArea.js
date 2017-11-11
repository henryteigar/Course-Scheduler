import React, {Component} from 'react';

import CollapsibleTextButton from "client/components/CollapsibleTextButton/CollapsibleTextButton";

import './detailed-search-area.scss';
import DropdownSelectBox from "../../../../../components/DropdownSelectBox/DropdownSelectBox";

class DetailedSearchArea extends Component {
    constructor() {
        super();
        this.state = {
            isCollapsed: true,
            className: "",
            test: {
                id: "institute",
                label: "Faculty/Department",
                values: [
                    {
                        id: 1,
                        label: "valik1"
                    },
                    {
                        id: 2,
                        label: "valik2"
                    },
                    {
                        id: 3,
                        label: "valik3"
                    }
                ]
            }
        }
    }

    toggleDetailedSearch() {
        this.setState({className: this.state.isCollapsed ? "opened" : "closed"});
        this.setState({isCollapsed: !this.state.isCollapsed});

    }

    render() {
        return (
            <div className={"detailed-search-area " + this.state.className}>
                <div className="toggle-button">
                    <CollapsibleTextButton name="Detailed search" collapsed={this.state.isCollapsed}
                                           clickHandler={this.toggleDetailedSearch.bind(this)}/>
                </div>
                <DropdownSelectBox id={this.state.test.id} label={this.state.test.label} values={this.state.test.values}/>
            </div>
        )
    }
}

export default DetailedSearchArea;