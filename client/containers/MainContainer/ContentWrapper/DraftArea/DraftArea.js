import React, {Component} from 'react';
import _ from 'underscore';

import DraftTable from "client/components/DraftTable/DraftTable";
import Button from "client/components/Button/Button";
import * as CourseDraftAction from 'client/actions/CourseDraftAction';
import CourseDraftStore from 'client/stores/CourseDraftStore';
import RegisteredCoursesStore from 'client/stores/RegisteredCoursesStore';

import 'client/containers/MainContainer/ContentWrapper/DraftArea/draft-area.scss';

class DraftArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: {
                draftedCourses: [],
                registeredCourses: []
            },
            selectedCourses: []
        };
        CourseDraftAction.fetchDraftedCourses();
    }

    componentWillMount() {
        CourseDraftStore.on("change", () => {
            let courses = this.state.courses;
            courses.draftedCourses = CourseDraftStore.getAll();
            this.setState({courses: courses})
        });
        RegisteredCoursesStore.on("change", () => {
            let courses = this.state.courses;
            courses.registeredCourses = RegisteredCoursesStore.getAll();
            this.setState({courses: courses})
        })
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

    removeFromDraft() {
        CourseDraftAction.removeFromDraft(this.state.selectedCourses);
        let courses = this.state.courses;
        courses.draftedCourses = CourseDraftStore.getAll()
        this.setState({
            selectedCourses: [],
            courses
        });
    }

    putAutomaticallyToTimetable() {
        let registered_occurrences = _.flatten(this.state.courses.registeredCourses.map((registeredCourse) => {
            return registeredCourse.course.occurrences.filter((occurrence) => {
                return registeredCourse.locked_group === null || occurrence.group === null || occurrence.group.id === registeredCourse.locked_group.id
            }).map((occurrence) => {
                return occurrence.time;
            })
        }));
    }

    getResultArea() {
        let searchResultArea ;

        if (this.state.courses.draftedCourses) {
            searchResultArea =
                <div>
                    <DraftTable courses={this.state.courses.draftedCourses} changeHandler={this.toggleCourse.bind(this)} />
                    <div className="button-area">
                        <Button class="small red" name="Remove from draft"
                                clickHandler={this.removeFromDraft.bind(this)} />
                    </div>
                    <div className="button-area">
                        <Button class="small blue" name="Put automatically to timetable" clickHandler={this.putAutomaticallyToTimetable.bind(this)}/>
                    </div>
                </div>
        }

        return searchResultArea;
    }

    render() {
        return (
            <div className="draft-area">
                <h2>Courses in draft</h2>
                <hr />
                {this.getResultArea()}
            </div>
        )
    }
}

export default DraftArea;