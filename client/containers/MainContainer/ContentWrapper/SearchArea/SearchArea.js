import React, {Component} from 'react';

import CourseSearchTable from "client/components/CourseSearchTable/CourseSearchTable";
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Button from "client/components/Button/Button";
import Tabs from "../../../../components/Tabs/Tabs";

import * as CourseSearchAction from 'client/actions/CourseSearchAction';
import CourseSearchStore from 'client/stores/CourseSearchStore';

import 'client/containers/MainContainer/ContentWrapper/SearchArea/search-area.scss';

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: CourseSearchStore.getAll(),
            query: '',
            filters: {
                yldotsing: "Üldotsing",
                isiklikud: "Isiklik",
                kohustuslikud: "Kohustuslikud",
                valik: "Valik",
            },
            selectedFilter: "yldotsing"
        };
    }

    updateQuery(e) {
        this.setState({"query": e.target.value});
    }

    componentWillMount() {
        CourseSearchStore.on("change", () => {
            this.setState({
                courses: CourseSearchStore.getAll()
            })
        });
    }

    handleClick() {
        CourseSearchAction.searchCourses(this.state.query);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div className="searchArea">
                <h2>Ainete lisamine</h2>
                <hr/>
                <SearchBox changeHandler={this.updateQuery.bind(this)}
                           keyPressHandler={this.handleKeyPress.bind(this)}
                           class="mainSearchBox"/>
                <Tabs tabs={this.state.filters} activeTab={this.state.selectedFilter}/>
                <div className="searchButton">
                    <Button class="big blue" name="Otsi" clickHandler={this.handleClick.bind(this)}/>
                </div>
                <CourseSearchTable courses={this.state.courses}/>
            </div>
        )
    }
}

export default SearchArea;