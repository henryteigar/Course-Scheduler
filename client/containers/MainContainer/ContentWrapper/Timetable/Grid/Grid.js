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
            let selectedGroup = (el.locked_group !== undefined && el.locked_group !== null) ? el.locked_group : el.active_group;
            el.course.occurrences.forEach((occurrence) => {
                filteredOccurrences = filteredOccurrences.concat(occurrence.time.filter((timeEl) => {
                    return timeEl.day === dayNr && (occurrence.group === null || selectedGroup === null || selectedGroup.id === occurrence.group.id);
                }).map((time) => {
                    time.length = this.getTimeLength(time);
                    return {
                        isDraft: isDraft,
                        type: occurrence.type,
                        name: el.course.name_eng,
                        time: time,
                        group: occurrence.group.name,
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
                <Column name="Monday" occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, 1, 1)}/>
                <Column name="Tuesday" occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, 1, 2)}/>
                <Column name="Wednesday" occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, 1, 3)}/>
                <Column name="Thursday" occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, 1, 4)}/>
                <Column name="Friday" occurrences={this.getOccurrencesForDayAndWeek(this.props.courses, 1, 5)}/>
            </div>
        )
    }
}

export default Grid;