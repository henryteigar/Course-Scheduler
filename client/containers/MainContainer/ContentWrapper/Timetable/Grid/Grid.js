import React, {Component} from 'react';

import './grid.scss';
import Column from "./Column/Column";

class Grid extends Component {
    constructor() {
        super();
        this.state = {};
    }

    getOccurrencesForDayAndWeek(courses, weekNr, dayNr) {

        return this.filterAndMapOccurrences(false, courses.registeredCourses, weekNr, dayNr)
            .concat(this.filterAndMapOccurrences(true, courses.draftedCourses, weekNr, dayNr));
    }

    getTimeLength(time) {
        let hourDiff = time.end_hour - time.start_hour;
        let minuteDiff = time.end_minute - time.start_minute;
        return Math.round(hourDiff * 60 + minuteDiff);
    }

    filterAndMapOccurrences(isDraft, data, weekNr, dayNr) {
        let filteredOccurrences = [];
        data.forEach((el) => {
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
                console.log(relevantOccurrences)
            } else {
                if (el.has_group_system && el.locked_group !== null) {
                    relevantOccurrences = el.locked_group.occurrences;
                } else {
                    relevantOccurrences = el.course.occurrences;
                }
            }

            relevantOccurrences.forEach((occurrence) => {
                filteredOccurrences = filteredOccurrences.concat(occurrence.time.filter((timeEl) => {
                    return timeEl.week === weekNr && timeEl.day === (dayNr + 1);
                }).map((time) => {
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

    render() {
        return (
            <div className="grid">
                <Column name="Monday"
                        day={0}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, this.props.currentWeek.nr, 0)} />
                <Column name="Tuesday"
                        day={1}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, this.props.currentWeek.nr, 1)} />
                <Column name="Wednesday"
                        day={2}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, this.props.currentWeek.nr, 2)} />
                <Column name="Thursday"
                        day={3}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, this.props.currentWeek.nr, 3)} />
                <Column name="Friday"
                        day={4}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, this.props.currentWeek.nr, 4)} />
            </div>
        )
    }
}

export default Grid;