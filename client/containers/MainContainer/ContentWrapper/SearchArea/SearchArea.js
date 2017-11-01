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
            inputPlaceholder: "Search course name, code, institute etc...",
            query: '',
            filters: {
                yldotsing: "All",
                kohustuslik: "Obligatory courses",
                //isiklik: "Personal", TODO left out for demo resons
                valik: "Elective courses",
            },
            initialFilter: "yldotsing"
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
            this.setState({inputPlaceholder: "Search course name, code, instute etc..."});
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

    render() {
        return (
            <div className="searchArea">
                <h2>Add courses</h2>
                <hr/>
                <SearchBox changeHandler={this.updateQuery.bind(this)}
                           keyPressHandler={this.keyPressHandler.bind(this)}
                           placeholder={this.state.inputPlaceholder}
                           class="mainSearchBox"
                           value={this.state.query}/>
                <Tabs tabs={this.state.filters} activeTab={this.state.initialFilter}
                      changeTabHandler={this.changeFilterHandler.bind(this)}/>
                <div className="searchButton">
                    <Button class="big blue" name="Search" clickHandler={this.updateSearchResult.bind(this)}/>
                </div>
                <CourseSearchTable courses={this.state.courses}/>
            </div>
        )
    }
}

export default SearchArea;