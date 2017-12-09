import React, {Component} from 'react';
import _ from 'underscore';

import CheckBox from "client/components/CheckBox/CheckBox";
import Modal from 'client/components/Modal/Modal'

import 'client/components/DraftTable/draft-table.scss';

class DraftTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            child: null,
        };
        this.groupLockModalId = "lock-group-preference-modal";
    }

    groupPreference(draftedCourse) {
        let rowContent;

        if (draftedCourse.locked_groups) {
            rowContent =
                <div>
                    <img height='18' src="../../images/lock.svg" className="lock-icon" />
                    <span className="green">{draftedCourse.locked_groups.map((group) => group.name).join(", ")}</span>
                </div>
        } else {
            rowContent =
                <div>
                    <img height='18' src="../../images/unlock.svg" className="lock-icon" />
                    <span>Lock group preference</span>
                </div>
        }

        return (
            <div className="preference" onClick={() => this.openGroupSelectModal(draftedCourse)}>
                { rowContent }
            </div>
        )
    }

    openGroupSelectModal(draftedCourse) {
        this.setChild(draftedCourse);
        const modal = document.getElementById(this.groupLockModalId);
        modal.style.display = "block";
    }

    setChild(draftedCourse) {

        const parseOccurrences = function(occurrence) {
            const times = occurrence.map((occurrence) => occurrence.time);

            const groups = _.groupBy(_.flatten(times), function(value){
                return value.day + '#' + value.start_time + '#' + value.end_time;
            });

            const occurrences = _.map(groups, function(group){
                return {
                    day: group[0].day,
                    start_time: group[0].start_time,
                    end_time: group[0].end_time,
                    weeks: _.pluck(group, 'week')
                }
            });

            return occurrences;
        };

        const getWeeks = function(occurrence) { return occurrence.weeks };
        const getDay = function(occurrence) { return occurrence.day; };

        let lectures, practicals;

        const occurrences = _.groupBy(draftedCourse.course.occurrences, 'type');

        if (occurrences.lecture) {
            const lectureTimes = occurrences.lecture;
            lectures = parseOccurrences(lectureTimes);
        } else if (occurrences.practice) {
            const practiceTimes = occurrences.practice;
            practicals = parseOccurrences(practiceTimes);
        }

        console.log(lectures);
        console.log(practicals);

        if (lectures) {
            lectures =
                <div>
                    Lecture: {lectures.map(getDay)}
                </div>
        } else {
            lectures = <div>No lectures</div>
        }

        if (practicals) {
            practicals =
                <div>
                    Practicals: {practicals.map(getDay)}
                </div>
        } else {
            practicals = <div>No practicals</div>
        }

        this.setState({child: <div>{lectures}{practicals}</div>})
    }

    render () {
        return (
            <div>
                <Modal child={this.state.child} id={this.groupLockModalId}
                       heading="Lock group preference" showX />

                <table>
                    <thead>
                    <tr>
                        <th />
                        <th>Course name</th>
                        <th>Credits</th>
                        <th>Reg. persons</th>
                        <th>Preferences</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.courses.map((draftedCourse) =>
                        <tr key={draftedCourse.course.id}>
                            <td><CheckBox changeHandler={this.props.changeHandler} value={draftedCourse}
                                          classes="blue small" /></td>
                            <td>{draftedCourse.course.name_eng}</td>
                            <td>{draftedCourse.course.credits} EAP</td>
                            <td>{draftedCourse.course.reg_persons_info}</td>
                            <td>{this.groupPreference(draftedCourse)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default DraftTable;