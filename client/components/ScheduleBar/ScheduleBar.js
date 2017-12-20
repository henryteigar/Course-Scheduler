import React, {Component} from 'react';
import _ from 'underscore';

import Tooltip from 'client/components/Tooltip/Tooltip';

import 'client/components/ScheduleBar/schedule-bar.scss';

class ScheduleBar extends Component {
    constructor(props) {
        super(props);
        this.class = props.class;
    }

    getParsedOccurrences() {

        const occ = this.props.occurrences[0];

        let weeks = occ.weeks.sort();

        weeks = _.reduce(weeks, function (acc, x) {
            if (acc.slice(-1)[0] && (acc.slice(-1)[0]).slice(-1)[0] === x - 1) {
                (acc.slice(-1)[0]).push(x);
                return acc;
            } else {
                return acc.concat([[x]])
            }
        }, [])
            .map(x => {
                if (x.length > 1) return `${x[0]}-${x.slice(-1)[0]}`;
                else return `${x[0]}`
            })
            .join(", ");

        return {
            "start_time": occ.start_time.substring(0, 5),
            "end_time": occ.end_time.substring(0, 5),
            "weeks": weeks,
        }
    };

    render() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        if (!this.props.occurrences) return null;

        return (
            <div className="schedule-bar">
                {days.map((day) =>
                    _.pluck(this.props.occurrences, 'day').includes(_.indexOf(days, day) + 1)
                        ? <span key={day} className={"green day " + this.class}>{day}
                            <Tooltip occurrence={this.getParsedOccurrences()} />
                        </span>
                        : <span className={"day " + this.class} key={day}>{day}</span>)
                }
            </div>
        )
    }
}

export default ScheduleBar;