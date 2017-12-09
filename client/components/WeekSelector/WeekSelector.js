import React, {Component} from 'react';

import './week-selector.scss'

class WeekSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeek: props.weeks[0],
            weeks: props.weeks
        }
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    render() {
        let startDate = this.state.currentWeek.startDate;
        let endDate = this.addDays(this.state.currentWeek.startDate, 7);
        let startDay = ('0' + startDate.getDate()).slice(-2);
        let startMonth = ('0' + startDate.getMonth()).slice(-2);
        let endDay = ('0' + endDate.getDate()).slice(-2);
        let endMonth = ('0' + endDate.getMonth()).slice(-2);


        return (
            <div className="week-selector">
                <p>Week {this.state.currentWeek.nr + " - " + startDay + "." + startMonth + " - " + endDay + "." + endMonth}</p>
            </div>
        );
    }
}

export default WeekSelector;