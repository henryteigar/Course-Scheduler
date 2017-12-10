import React, {Component} from 'react';
import _ from 'underscore';

import 'client/components/ScheduleBar/schedule-bar.scss';

class ScheduleBar extends Component {
    constructor(props) {
        super(props);
        this.class = props.class;
    }

    render() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        if (!this.props.occurrences) return null;

        return (
            <div className="schedule-bar">
                {days.map((day) =>
                    _.pluck(this.props.occurrences, 'day').includes(_.indexOf(days, day) + 1)
                        ? <span key={day} className={"green day " + this.class}>{day}</span>
                        : <span className={"day " + this.class} key={day}>{day}</span>)
                }
            </div>
        )
    }
}

export default ScheduleBar;