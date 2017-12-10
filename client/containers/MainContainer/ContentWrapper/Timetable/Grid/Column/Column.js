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

    render() {
        let occurrences = this.props.occurrences;


        if (this.props.day === 2) {
            /*console.log(occurrences)*/
        }


        return (
            <div className="column">
                <label>
                    {this.state.days[this.props.day]}
                    <span>{Utils.formatDate(Utils.addDays(this.props.currentWeek.startDate, this.props.day))}</span>
                </label>
                <div className="day-area">
                  {[...Array(11)].map((x, i) => <hr key={i}/>)}
                    {occurrences.map((occurrence, i) =>
                        <SubjectFrame key={i} occurrence={occurrence} />
                    )}


                </div>
            </div>
        )
    }
}

export default Column;