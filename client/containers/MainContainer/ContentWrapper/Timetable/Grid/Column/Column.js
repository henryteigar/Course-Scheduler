import React, {Component} from 'react';

import './column.scss';

class Column extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div className="column">
                <label>Esmaspäev</label>
                <div className="day-area"></div>
            </div>
        )
    }
}

export default Column;