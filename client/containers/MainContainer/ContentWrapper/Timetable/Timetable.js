import React, {Component} from 'react';

import './timetable.scss';
import Grid from "./Grid/Grid";
import Button from "client/components/Button/Button";
import TimetableTimeBar from "client/components/TimetableTimeBar/TimetableTimeBar";
import CourseDraftStore from 'client/stores/CourseDraftStore';
import RegisteredCoursesStore from 'client/stores/RegisteredCoursesStore';
import WeekSelector from 'client/components/WeekSelector/WeekSelector';
import * as RegisteredCoursesAction from 'client/actions/RegisteredCoursesAction';
import * as CourseDraftAction from 'client/actions/CourseDraftAction';
import _ from 'underscore';
import moment from 'moment';

class Timetable extends Component {
    constructor() {
        super();
        this.state = {
            nrOfConflicts: null,
            conflictingWeeks: null,
            courses: {
                draftedCourses: [],
                registeredCourses: []
            },
            weeks: [
                {
                    nr: 24,
                    startDate: new Date(2018, 1, 12)
                },
                {
                    nr: 25,
                    startDate: new Date(2018, 1, 19)
                },
                {
                    nr: 26,
                    startDate: new Date(2018, 1, 26)
                },
                {
                    nr: 27,
                    startDate: new Date(2018, 2, 5)
                },
                {
                    nr: 28,
                    startDate: new Date(2018, 2, 12)
                },
                {
                    nr: 29,
                    startDate: new Date(2018, 2, 19)
                },
                {
                    nr: 30,
                    startDate: new Date(2018, 2, 26)
                },
                {
                    nr: 31,
                    startDate: new Date(2018, 3, 2)
                },
                {
                    nr: 32,
                    startDate: new Date(2018, 3, 9)
                },
                {
                    nr: 33,
                    startDate: new Date(2018, 3, 16)
                },
                {
                    nr: 34,
                    startDate: new Date(2018, 3, 23)
                },
                {
                    nr: 35,
                    startDate: new Date(2018, 3, 30)
                }, {
                    nr: 36,
                    startDate: new Date(2018, 4, 7)
                },
                {
                    nr: 37,
                    startDate: new Date(2018, 4, 14)
                },
                {
                    nr: 38,
                    startDate: new Date(2018, 4, 21)
                },
                {
                    nr: 39,
                    startDate: new Date(2018, 4, 28)
                }
            ],
            currentWeek: null
        };
    };

    componentWillMount() {
        this.setState({currentWeek: this.state.weeks[0]});

        CourseDraftStore.on("change", () => {
            let courses = this.state.courses;
            courses.draftedCourses = CourseDraftStore.getAll();
            this.updateConflictInfo();
            this.setState({courses: courses})
        });
        RegisteredCoursesStore.on("change", () => {
            let courses = this.state.courses;
            courses.registeredCourses = RegisteredCoursesStore.getAll();
            this.updateConflictInfo();
            this.setState({courses: courses})
        })
    }

    handleBack(e) {
        let currentIndex = this.state.weeks.indexOf(this.state.currentWeek);
        if (currentIndex !== 0) {
            this.setState({currentWeek: this.state.weeks[currentIndex - 1]})
        }
    }

    handleForward(e) {
        let currentIndex = this.state.weeks.indexOf(this.state.currentWeek);
        if (currentIndex !== this.state.weeks.length - 1) {
            this.setState({currentWeek: this.state.weeks[currentIndex + 1]})
        }
    }

    makeMagicWithCourses(courses, isDraft) {
        let filteredOccurrences = [];

        courses.forEach((el) => {
            let relevantOccurrences = null;

            if (isDraft) {
                if (el.has_group_system) {
                    if (el.active_group !== null) {
                        relevantOccurrences = el.active_group.occurrences;
                    } else {
                        relevantOccurrences = [];
                    }
                } else {
                    relevantOccurrences = el.course.occurrences;
                }
            } else {
                if (el.has_group_system && el.locked_group !== null) {
                    relevantOccurrences = el.locked_group.occurrences;
                } else {
                    relevantOccurrences = el.course.occurrences;
                }
            }
            if (relevantOccurrences === null) {
                return filteredOccurrences;
            }
            relevantOccurrences.forEach((occurrence) => {
                filteredOccurrences = filteredOccurrences.concat(occurrence.time.map((time) => {
                    time.length = this.getTimeLength(time);
                    return {
                        isDraft: isDraft,
                        type: occurrence.type,
                        name: el.course.name_eng,
                        time: time,
                        group: occurrence.group,
                        place: occurrence.place
                    }
                }));
            });
        });
        return filteredOccurrences;
    }

    getAllOccurrences() {
        let registeredCourses = this.makeMagicWithCourses(this.state.courses.registeredCourses, false);
        let draftedCourses = this.makeMagicWithCourses(this.state.courses.draftedCourses, true);
        return registeredCourses.concat(draftedCourses);
    }

    getTimeLength(time) {
        let hourDiff = time.end_hour - time.start_hour;
        let minuteDiff = time.end_minute - time.start_minute;
        return Math.round(hourDiff * 60 + minuteDiff);
    }

    updateConflictInfo() {
        let allOccurrences = this.getAllOccurrences();
        let nrOfConflicts = 0;
        let conflictingWeeks = [];

        let timeFormat = 'hh:mm:ss';

        let occurrences_new = allOccurrences.map((occurrence) => {
            let startTime = moment(occurrence.time.start_time, timeFormat);
            let endTime = moment(occurrence.time.end_time, timeFormat);
            let overlappingOccurrences = [];
            allOccurrences.forEach((occurrence_other) => {
                if (occurrence === occurrence_other) {
                    return;
                }
                let otherStartTime = moment(occurrence_other.time.start_time, timeFormat);
                let otherEndTime = moment(occurrence_other.time.end_time, timeFormat);

                if (occurrence_other.time.week === occurrence.time.week
                    && occurrence_other.time.day === occurrence.time.day
                    && startTime.isBetween(otherStartTime, otherEndTime, 'minutes', '[]')
                    && startTime !== otherEndTime
                    && endTime !== otherEndTime) {
                    nrOfConflicts += 1;
                    if (conflictingWeeks.indexOf(occurrence_other.time.week) === -1) {
                        conflictingWeeks.push(occurrence_other.time.week);
                    }
                    overlappingOccurrences.push(occurrence_other)
                }
            });
            occurrence.overlapping_occurrences = overlappingOccurrences;

            return occurrence
        });
        allOccurrences = occurrences_new;

        this.setState({nrOfConflicts});
        this.setState({conflictingWeeks});
    }

    getConflictInfoMessage() {
        return (this.state.conflictingWeeks !== null && this.state.conflictingWeeks.length > 0) ? "Conflict weeks: (" + this.state.conflictingWeeks + ")" : "";
    }

    handleRegisterDraftCourses() {
        let draftedCourses = this.state.courses.draftedCourses;
        let allValid = true;

        draftedCourses.forEach((draftedCourse) => {
            if (draftedCourse.has_group_system && !draftedCourse.active_group) {
                allValid = false;
            }
        });

        if (allValid) {
            let toBeRegisteredCourses = draftedCourses.map((draftedCourse) => {
                let course = draftedCourse;
                course.locked_group = course.active_group;

                return course;
            });

            CourseDraftAction.removeFromDraft(draftedCourses);
            RegisteredCoursesAction.addToRegisteredCourses(toBeRegisteredCourses);
        } else {
            alert("Some of the groups of draft courses haven't been selected. Click 'Put automatically to timetable'")
        }
    }

    render() {
        return (
            <div className="timetable">
                <div className="header">
                    <h2>Timetable</h2>
                    <WeekSelector weeks={this.state.weeks}
                                  currentWeek={this.state.currentWeek}
                                  forwardHandler={this.handleForward.bind(this)}
                                  backHandler={this.handleBack.bind(this)} />
                    <p className="warning">{this.getConflictInfoMessage()}</p>
                </div>
                <hr />
                <TimetableTimeBar />
                <Grid courses={this.state.courses} currentWeek={this.state.currentWeek} />
                <div className="register-btn">
                    <Button clickHandler={this.handleRegisterDraftCourses.bind(this)} name="Register draft courses"
                            class="green small" />
                </div>
            </div>
        )
    }
}

export default Timetable;