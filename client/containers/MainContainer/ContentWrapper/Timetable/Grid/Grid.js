import React, {Component} from 'react';

import './grid.scss';
import Column from "./Column/Column";

class Grid extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="grid">
                <Column name="Monday"
                        day={0}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.props.allOccurrences.filter(occ => occ.time.week == this.props.currentWeek.nr && occ.time.day == 1)} />
                <Column name="Tuesday"
                        day={1}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.props.allOccurrences.filter(occ => occ.time.week == this.props.currentWeek.nr && occ.time.day == 2)} />
                <Column name="Wednesday"
                        day={2}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.props.allOccurrences.filter(occ => occ.time.week == this.props.currentWeek.nr && occ.time.day == 3)} />
                <Column name="Thursday"
                        day={3}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.props.allOccurrences.filter(occ => occ.time.week == this.props.currentWeek.nr && occ.time.day == 4)} />
                <Column name="Friday"
                        day={4}
                        currentWeek={this.props.currentWeek}
                        occurrences={this.props.allOccurrences.filter(occ => occ.time.week == this.props.currentWeek.nr && occ.time.day == 5)} />
            </div>
        )
    }
}

export default Grid;