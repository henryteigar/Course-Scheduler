import React, {Component} from 'react';
import * as Utils from 'client/utils/Utils'
import './column.scss';
import SubjectFrame from "client/components/SubjectFrame/SubjectFrame";
import moment from 'moment'

class Column extends Component {
    constructor() {
        super();
        this.state = {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        };
    }

    getOrderNr(occurrence) {
        let orderNr = 0;
        if (occurrence.overlapping_occurrences.length > 0) {
            let ids = [];
            ids.push(occurrence.time.id);
            occurrence.overlapping_occurrences.forEach(e => ids.push(e.time.id))
            ids.sort();
            orderNr = ids.indexOf(occurrence.time.id);
        }

        return orderNr;
    }

    render() {
        let occurrences = this.props.occurrences;

        return (
            <div className="column">
                <label>
                    {this.state.days[this.props.day]}
                    <span>{Utils.formatDate(Utils.addDays(this.props.currentWeek.startDate, this.props.day))}</span>
                </label>
                <div className="day-area">
                  {[...Array(11)].map((x, i) => <hr key={i}/>)}
                    {occurrences.map((occurrence, i) =>
                        <SubjectFrame key={i} occurrence={occurrence} overlap_cnt={occurrence.overlapping_occurrences.length} orderNr={this.getOrderNr(occurrence)} />
                    )}
                </div>
            </div>
        )
    }
}

export default Column;