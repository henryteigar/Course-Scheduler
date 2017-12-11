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
                registeredCourses: [],
            },
            selectedCourses: [],
            lastAutomaticalSchedulingTime: null,
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

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    putAutomaticallyToTimetable() {
        let currentTime = (new Date()).getTime();

        if (this.state.lastAutomaticalSchedulingTime
            && currentTime - this.state.lastAutomaticalSchedulingTime < 500) {
            return;
        }

        this.state.lastAutomaticalSchedulingTime = currentTime;

        let registeredOccurrences = _.flatten(this.state.courses.registeredCourses.map((registeredCourse) => {
            return registeredCourse.course.occurrences.filter((occurrence) => {
                return !registeredCourse.has_group_system|| occurrence.group === null || occurrence.group.id === registeredCourse.locked_group.id
            }).map((occurrence) => {
                return occurrence.time;
            })
        }));

        let draftedCourses = this.state.courses.draftedCourses;

        draftedCourses.forEach((draftedCourse) => {
            if (draftedCourse.has_group_system) {
                let candidateGroups = [];

                if (draftedCourse.locked_groups !== null && draftedCourse.locked_groups.length > 0) {
                    candidateGroups = draftedCourse.locked_groups;
                } else {
                    let allPossibleGroupsIds = [];
                    draftedCourse.course.occurrences.forEach((occurrence) => {
                        if (occurrence.group !== null && allPossibleGroupsIds.indexOf(occurrence.group.id) <= -1) {
                            allPossibleGroupsIds.push(occurrence.group.id);
                        }
                    });
                    candidateGroups = allPossibleGroupsIds.map((id) => { return {id:id}});
                }

                if (candidateGroups.length > 0) {
                    draftedCourse.active_group = candidateGroups[this.getRandomInt(0,candidateGroups.length)];

                    CourseDraftAction.updateDraftCourse(draftedCourse.course.id, draftedCourse.locked_groups, draftedCourse.active_group);
                }
            }
        });
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