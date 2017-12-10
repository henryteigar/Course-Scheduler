import React, {Component} from 'react';
import _ from 'underscore';

class SmartGroupSelector extends Component {
    constructor() {
        super();
    }

    parseOccurrences(occurrence) {
        const times = occurrence.map((occurrence) => occurrence.time);

        const groups = _.groupBy(_.flatten(times), function(value) {
            return value.day + '#' + value.start_time + '#' + value.end_time;
        });

        const occurrences = _.map(groups, function(group) {
            return {
                day: group[0].day,
                start_time: group[0].start_time,
                end_time: group[0].end_time,
                weeks: _.pluck(group, 'week')
            }
        });

        return occurrences;
    };

    getDay(occurrence) { return occurrence.day; };

    lecturesScheduleBar(lectures) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        if (!lectures) return null;

        return (
            <div>
                <label>Lecture:</label>
                { days.map((day) =>
                    lectures.map(this.getDay).includes(_.indexOf(days, day) + 1) ?
                        <span key={day} className="green day">{day}</span>
                        :
                        <span className="day" key={day}>{day}</span>)
                }
            </div>
        )
    }

    practicalsGroupsTable(practicals) {
        if (!practicals) return null;

        return (
            <div>
                Practicals: {practicals.map(this.getDay)}
            </div>
        )
    }

    makeChild(draftedCourse) {
        let lectures, practicals;

        const occurrences = _.groupBy(draftedCourse.course.occurrences, 'type');

        console.log(occurrences);

        if (occurrences.lecture) {
            const lectureTimes = occurrences.lecture;
            lectures = this.parseOccurrences(lectureTimes);
        } else if (occurrences.practice) {
            const practiceTimes = occurrences.practice;
            practicals = this.parseOccurrences(practiceTimes);
        }

        console.log(lectures);
        console.log(practicals);

        const lecturesScheduleBar = this.lecturesScheduleBar(lectures);
        const practicalsGroupsTable = this.practicalsGroupsTable(practicals);

        return <div>{lecturesScheduleBar}{practicalsGroupsTable}</div>;
    }

    render() {
        return <div>{this.makeChild(this.props.course)}</div>
    }
}

export default SmartGroupSelector;