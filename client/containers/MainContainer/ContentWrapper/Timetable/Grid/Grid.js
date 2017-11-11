import React, {Component} from 'react';

import './grid.scss';
import Column from "./Column/Column";

class Grid extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div className="grid">
                <Column/>
                <Column/>
                <Column/>
                <Column/>
                <Column/>
            </div>
        )
    }
}

export default Grid;