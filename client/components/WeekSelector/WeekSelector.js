import React, {Component} from 'react';

import './week-selector.scss'

class WeekSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeek: props.currentWeek
        }
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    render() {
        let startDate = this.props.currentWeek.startDate;
        let endDate = this.addDays(this.props.currentWeek.startDate, 7);
        let startDay = ('0' + startDate.getDate()).slice(-2);
        let startMonth = ('0' + startDate.getMonth()).slice(-2);
        let endDay = ('0' + endDate.getDate()).slice(-2);
        let endMonth = ('0' + endDate.getMonth()).slice(-2);


        return (
            <div className="week-selector">

                <p>
                    <span onClick={this.props.backHandler}>
                        <img src="../../images/angle-left.svg" className="arrow" />
                    </span>
                    Week {this.props.currentWeek.nr + " - " + startDay + "." + startMonth + " - " + endDay + "." + endMonth}
                    <span onClick={this.props.forwardHandler}>
                        <img src="../../images/angle-right.svg" className="arrow" />
                    </span>
                </p>
            </div>
        );
    }
}

export default WeekSelector;