import React, {Component} from 'react';

import './timetable.scss';
import Grid from "./Grid/Grid";
import Button from "client/components/Button/Button";

class Timetable extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div className="timetable">
                <h2>Timetable</h2>
                <hr />
                <Grid />
                <div className="register-btn">
                    <Button name="Register draft courses" class="green small"/>
                </div>
            </div>
        )
    }
}

export default Timetable;