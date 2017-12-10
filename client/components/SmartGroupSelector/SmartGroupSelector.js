import React, {Component} from 'react';
import _ from 'underscore';

class SmartGroupSelector extends Component {
    constructor() {
        super();
    }

    parseTimeFromOccurrence(occurrence) {
        const times = occurrence.map((occurrence) => occurrence.time);

        const groups = _.groupBy(_.flatten(times), (value) => {
            return value.day + '#' + value.start_time + '#' + value.end_time;
        });

        const occurrences = _.map(groups, (group) => {
            return {
                day: group[0].day,
                start_time: group[0].start_time,
                end_time: group[0].end_time,
                weeks: _.pluck(group, 'week')
            }
        });

        return occurrences;
    };

    parseTimeFromPracticalOccurrences(occurences) {
        const groups = _.groupBy(occurences, (value) => {
            return value.group.id + '#' + value.group.name;
        });

        const occurrences = _.map(groups, (group) => {
            return {
                group: group[0].group,
                occurrences: this.parseTimeFromOccurrence(group)
            }
        });

        return occurrences
    }

    lecturesScheduleBar(lectureOccurrences) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        if (!lectureOccurrences) return null;

        return (
            <div>
                <label>Lecture:</label>
                {days.map((day) =>
                    _.pluck(lectureOccurrences, 'day').includes(_.indexOf(days, day) + 1)
                        ? <span key={day} className="green day">{day}</span>
                        : <span className="day" key={day}>{day}</span>)
                }
            </div>
        )
    }

    practicalsGroupsTable(practicals) {
        console.log(practicals);

        if (!practicals) return null;

        return (
            <div>
                <label>Practicals: </label>
                {practicals.map((p) => <span key={p.group.id}>{p.group.name}   </span>)}
            </div>
        )
    }

    makeChild(draftedCourse) {
        let lectureOccurrences, practicalOccurrences;

        const occurrences = _.groupBy(draftedCourse.course.occurrences, 'type');

        // console.log(occurrences)

        if (occurrences.lecture) {
            lectureOccurrences = this.parseTimeFromOccurrence(occurrences.lecture);
        }

        if (occurrences.practice) {
            practicalOccurrences = this.parseTimeFromPracticalOccurrences(occurrences.practice);
        }

        // console.log(lectureOccurrences);
        // console.log(practicalOccurrences);

        const lecturesScheduleBar = this.lecturesScheduleBar(lectureOccurrences);
        const practicalsGroupsTable = this.practicalsGroupsTable(practicalOccurrences);

        return <div>{lecturesScheduleBar}{practicalsGroupsTable}</div>;
    }

    render() {
        return <div>{this.makeChild(this.props.course)}</div>
    }
}

export default SmartGroupSelector;