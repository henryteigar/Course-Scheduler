import React, {Component} from 'react';

import './grid.scss';
import Column from "./Column/Column";

class Grid extends Component {
    constructor() {
        super();
        this.state = {};
    }

    getOccurrencesForDayAndWeek(courses, weekNr, dayNr) {
        return this.filterAndMapOccurrences(true, courses.drafts, weekNr, dayNr)
            .concat(this.filterAndMapOccurrences(false, courses.registered, weekNr, dayNr))
    }

    getTimeLength(time) {
        let hourDiff = time.end_hour - time.start_hour;
        let minuteDiff = time.end_minute - time.start_minute;
        return Math.round(hourDiff * 60 + minuteDiff);
    }

    filterAndMapOccurrences(isDraft, data, weekNr, dayNr) {
        let specificOccurrences = [];

        data.forEach((el) => {
            el.occurrences.forEach((occurrence) => {

                specificOccurrences = specificOccurrences.concat(occurrence.time.filter((time) => {
                    return time.day === dayNr && time.week === weekNr;
                }).map((time) => {
                    time.length = this.getTimeLength(time);
                    return {
                        isDraft: isDraft,
                        type: occurrence.type,
                        name: el.name,
                        time: time,
                        group: occurrence.group,
                        place: occurrence.place
                    }
                }));
            });
        });
        return specificOccurrences;
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