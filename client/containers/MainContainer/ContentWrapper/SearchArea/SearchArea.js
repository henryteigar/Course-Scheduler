import React, {Component} from 'react';

import CourseSearchTable from "client/components/CourseSearchTable/CourseSearchTable";
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Button from "client/components/Button/Button";
import CollapsibleTextButton from "client/components/CollapsibleTextButton/CollapsibleTextButton";
import Tabs from "../../../../components/Tabs/Tabs";
import DetailedSearchArea from "client/containers/MainContainer/ContentWrapper/SearchArea/DetailedSearchArea/DetailedSearchArea"

import * as CourseSearchAction from 'client/actions/CourseSearchAction';
import * as CourseDraftAction from 'client/actions/CourseDraftAction';
import * as RegisteredCoursesAction from 'client/actions/RegisteredCoursesAction';
import CourseSearchStore from 'client/stores/CourseSearchStore';
import CourseDraftStore from 'client/stores/CourseDraftStore';
import RegisteredCoursesStore from 'client/stores/RegisteredCoursesStore';

import './search-area.scss';

class SearchArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            draftedCourses: CourseDraftStore.getAll(),
            registeredCourses: RegisteredCoursesStore.getAll(),
            courses: CourseSearchStore.getAll(),
            inputPlaceholder: "Search course name, code, institute etc...",
            query: '',
            filters: {
                all: "All",
                obligatory: "Obligatory courses",
                //isiklik: "Personal", TODO left out for demo resons
                elective: "Elective courses",
            },
            initialFilter: "all",
            selectedCourses: []
        };
    }

    componentWillMount() {
        CourseSearchStore.on("change", () => {
            this.setState({
                courses: CourseSearchStore.getAll(),
            })
        });
        CourseDraftStore.on("change", () => {
            this.setState({
                draftedCourses: CourseDraftStore.getAll(),
            })
        })
    }

    updateQuery(e) {
        this.setState({query: e.target.value});
    }

    updateSearchResult() {
        CourseSearchAction.searchCourses(this.state.query);
    }

    clearSearchResult() {
        this.setState({query: ""});
        CourseSearchAction.clearSearchResult();
    }

    filterChangeHandler(tab) {
        this.clearSearchResult();
        CourseSearchAction.changeCoursesSearchFilter(tab);

        if (tab === "all") {
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

    toggleCourse(course) {
        let courses = this.state.selectedCourses;

        if (courses.includes(course)) {
            courses = courses.filter(el => el !== course);
        } else {
            courses.push(course);
        }
        this.setState({selectedCourses: courses});
    }

    addToDraft() {
        let courses = this.state.selectedCourses.map((course) => {return {'course': course}});

        CourseDraftAction.addToDraft(courses);
        this.setState({
            draftedCourses: CourseDraftStore.getAll(),
            selectedCourses: []
        });
    }

    addToRegisteredCourses() {
        RegisteredCoursesAction.addToRegisteredCourses(this.state.selectedCourses);
        this.setState({
            registeredCourses: RegisteredCoursesStore.getAll(),
            selectedCourses: []
        });
    }

    getDisabledCoursesIds() {
        return this.state.registeredCourses.map((registeredCourse) => registeredCourse.course.id)
            .concat(this.state.draftedCourses.map((draftedCourse) => draftedCourse.course.id));
    }

    render() {
        let searchResultArea = null;
        if (this.state.courses.length > 0) {
            searchResultArea =
                <div className="search-result">
                    <div className="result-table">
                        <CourseSearchTable changeHandler={this.toggleCourse.bind(this)}
                                           courses={this.state.courses}
                                           disabledCoursesIds={this.getDisabledCoursesIds()} />
                    </div>
                    <div className="buttons-area">
                        <Button clickHandler={this.addToRegisteredCourses.bind(this)}
                                class="big blue" name="Register to chosen courses" />
                        <Button clickHandler={this.addToDraft.bind(this)}
                                class="big green" name="Add to draft" />
                    </div>
                </div>
        }

        return (
            <div className="search-area">
                <h2>Add courses</h2>
                <hr />
                <SearchBox changeHandler={this.updateQuery.bind(this)}
                           keyPressHandler={this.keyPressHandler.bind(this)}
                           placeholder={this.state.inputPlaceholder}
                           class="mainSearchBox"
                           value={this.state.query} />

                <Tabs tabs={this.state.filters} activeTab={this.state.initialFilter}
                      changeTabHandler={this.filterChangeHandler.bind(this)} />

                <div className="search-button">
                    <Button class="big blue" name="Search" clickHandler={this.updateSearchResult.bind(this)}/>
                </div>

                <DetailedSearchArea/>

                {searchResultArea}

            </div>
        )
    }
}

export default SearchArea;