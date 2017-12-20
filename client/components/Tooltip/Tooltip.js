import React, {Component} from 'react';

import 'client/components/Tooltip/tooltip.scss';

class Tooltip extends Component {
    constructor(props) {
        super(props);
        console.log(props.occurrence)
    }

    render() {
        return (
            <div className="tooltip">
                <div className="arrow-up"></div>
                <div className="tooltip-data">
                    <p>{this.props.occurrence.start_time} - {this.props.occurrence.end_time}</p>
                    <p>weeks {this.props.occurrence.weeks.sort().join(", ")}</p>
                </div>
            </div>
        )
    }
}

export default Tooltip;