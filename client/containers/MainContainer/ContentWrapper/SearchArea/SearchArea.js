import React, {Component} from 'react';

import CourseSearchTable from "client/components/CourseSearchTable/CourseSearchTable";
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Button from "client/components/Button/Button";
import Tabs from "../../../../components/Tabs/Tabs";

import * as CourseSearchAction from 'client/actions/CourseSearchAction';
import CourseSearchStore from 'client/stores/CourseSearchStore';


import './search-area.scss';
import CollapsibleTextButton from "client/components/CollapsibleTextButton/CollapsibleTextButton";

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: CourseSearchStore.getAll(),
            inputPlaceholder: "Search course name, code, institute etc...",
            query: '',
            filters: {
                yldotsing: "All",
                kohustuslik: "Obligatory courses",
                //isiklik: "Personal", TODO left out for demo resons
                valik: "Elective courses",
            },
            initialFilter: "yldotsing",
            selectedCourses: [],
            isDetailedSearchCollapsed: true
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

    updateSearchResult() {
        CourseSearchAction.searchCourses(this.state.query);
    }

    changeFilterHandler(tab) {
        this.clearSearchResults();
        CourseSearchAction.changeCoursesSearchFilter(tab);

        if (tab == "yldotsing") {
            this.setState({inputPlaceholder: "Search course name, code, institute etc..."});
        } else {
            this.setState({inputPlaceholder: "Filter results..."});
            CourseSearchAction.searchCourses(this.state.query);
        }
    }

    keyPressHandler(e) {
        if (e.key === 'Enter') {
            this.updateSearchResult();
        }
    }

    clearSearchResults() {
        this.setState({query: ""});
        CourseSearchAction.clearResults();
    }

    checkCourse(e) {
        console.log(e);
    }

    toggleDetailedSearch() {
        this.setState({isDetailedSearchCollapsed: !this.state.isDetailedSearchCollapsed})
    }

    render() {
        let searchResultArea = null;
        if (this.state.courses.length > 0) {
            searchResultArea =
                <div className="search-result">
                    <div className="result-table">
                        <CourseSearchTable changeHandler={this.checkCourse.bind(this)} courses={this.state.courses}/>
                    </div>
                    <div className="buttons-area">
                        <Button class="big blue" name="Register to chosen courses"/>
                        <Button class="big green" name="Add to draft"/>
                    </div>
                </div>
        }

        return (
            <div className="search-area">
                <h2>Add courses</h2>
                <hr/>
                <SearchBox changeHandler={this.updateQuery.bind(this)}
                           keyPressHandler={this.keyPressHandler.bind(this)}
                           placeholder={this.state.inputPlaceholder}
                           class="mainSearchBox"
                           value={this.state.query}/>
                <Tabs tabs={this.state.filters} activeTab={this.state.initialFilter}
                      changeTabHandler={this.changeFilterHandler.bind(this)}/>
                <div className="search-button">
                    <Button class="big blue" name="Search" clickHandler={this.updateSearchResult.bind(this)}/>
                </div>
                <CollapsibleTextButton name="Ava detailotsing" collapsed={this.state.isDetailedSearchCollapsed} clickHandler={this.toggleDetailedSearch.bind(this)}/>
                {searchResultArea}
            </div>
        )
    }
}

export default SearchArea;