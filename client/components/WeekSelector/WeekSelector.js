import React, {Component} from 'react';
import * as Utils from 'client/utils/Utils'
import './week-selector.scss'

class WeekSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let startDate = this.props.currentWeek.startDate;
        let endDate = Utils.addDays(this.props.currentWeek.startDate, 6);

        return (
            <div className="week-selector">
                <p>
                    <span onClick={this.props.backHandler}
                          className={this.props.weeks.indexOf(this.props.currentWeek) === 0 ? "hidden" : ""}>
                        <img src="../../images/angle-left.svg" className="arrow" />
                    </span>
                    Week {this.props.currentWeek.nr + " - " + Utils.formatDate(startDate) + " - " + Utils.formatDate(endDate)}
                    <span onClick={this.props.forwardHandler}
                          className={this.props.weeks.indexOf(this.props.currentWeek) === this.props.weeks.length - 1 ? "hidden" : ""}>
                        <img src="../../images/angle-right.svg" className="arrow" />
                    </span>
                </p>
            </div>
        );
    }
}

export default WeekSelector;