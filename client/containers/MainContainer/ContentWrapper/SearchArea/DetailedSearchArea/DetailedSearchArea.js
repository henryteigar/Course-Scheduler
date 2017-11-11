import React, {Component} from 'react';

import CollapsibleTextButton from "client/components/CollapsibleTextButton/CollapsibleTextButton";
import DropdownSelectBox from "client/components/DropdownSelectBox/DropdownSelectBox";
import * as Utils from 'client/utils/Utils'
import * as GeneralAction from 'client/actions/GeneralAction';

import './detailed-search-area.scss';

class DetailedSearchArea extends Component {
    constructor() {
        super();
        this.state = {
            isCollapsed: true,
            className: "",
            filters: GeneralAction.getAllFilters(),
            selectedFilters: null
        }
    }

    toggleDetailedSearch() {
        this.setState({className: this.state.isCollapsed ? "opened" : "closed"});
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    updateFilterValue(filter) {

    }



    render() {
        return (
            <div className={"detailed-search-area " + this.state.className}>
                <div className="toggle-button">
                    <CollapsibleTextButton name="Detailed search" collapsed={this.state.isCollapsed}
                                           clickHandler={this.toggleDetailedSearch.bind(this)} />
                </div>
                <div className="filter-area">
                    {this.state.filters.map((filter) =>
                        <DropdownSelectBox key={filter.id} id={filter.id} label={filter.label_eng}
                                           values={filter.values}
                                           className={Utils.getDropdownSelectBoxClassNameByFilter(filter)}
                                           clickHandler={this.updateFilterValue.bind(this)}/>
                    )}
                </div>
            </div>
        )
    }
}

export default DetailedSearchArea;