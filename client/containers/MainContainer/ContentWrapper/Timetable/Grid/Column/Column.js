import React, {Component} from 'react';

import './column.scss';
import SubjectFrame from "client/components/SubjectFrame/SubjectFrame";

class Column extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div className="column">
                <label>
                    {this.props.name}
                    <span>12.02</span>
                </label>
                <div className="day-area">
                  {[...Array(11)].map((x, i) => <hr key={i}/>)}
                    {this.props.occurrences.map((occurrence, i) =>
                        <SubjectFrame key={i} occurrence={occurrence} />
                    )}


                </div>
            </div>
        )
    }
}

export default Column;