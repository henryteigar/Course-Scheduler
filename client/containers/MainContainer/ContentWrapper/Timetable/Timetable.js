import React, {Component} from 'react';

import './timetable.scss';
import Grid from "./Grid/Grid";
import Button from "client/components/Button/Button";
import TimetableTimeBar from "client/components/TimetableTimeBar/TimetableTimeBar";

class Timetable extends Component {
    constructor() {
        super();
        this.state = {
            courses: {
                drafts: [{
                    name: "Software engineering",
                    occurrences: [{
                        type: "practice",
                        group: {
                            "id": 2,
                            name: "inf7"
                        },
                        place: "J.Liivi 2 - 404",
                        time: [{
                            "week": 1,
                            "day": 2,
                            "start_hour": 8,
                            "start_minute": 15,
                            "end_hour": 9,
                            "end_minute": 45,
                        }, {
                            "week": 1,
                            "day": 4,
                            "start_hour": 12,
                            "start_minute": 15,
                            "end_hour": 13,
                            "end_minute": 45,
                        }]
                    }, {
                        type: "lecture",
                        group: {
                            "id": 2,
                            name: "I group"
                        },
                        place: "J.Liivi 2 - 404",
                        time: [{
                            "week": 1,
                            "day": 2,
                            "start_hour": 10,
                            "start_minute": 15,
                            "end_hour": 11,
                            "end_minute": 45,
                        }]
                    }]
                }],
                registered: [{
                    name: "Computer programming",
                    occurrences: [{
                        type: "lecture",
                        group: {
                            "id": 2,
                            name: "II group"
                        },
                        place: "J.Liivi 2 - 111",
                        time: [{
                            "week": 1,
                            "day": 1,
                            "start_hour": 18,
                            "start_minute": 15,
                            "end_hour": 19,
                            "end_minute": 45,
                        }]
                    }]
                }]
            }
        };
    }

    render() {
        return (
            <div className="timetable">
                <h2>Timetable</h2>
                <hr />
                <TimetableTimeBar />
                <Grid courses={this.state.courses} />
                <div className="register-btn">
                    <Button name="Register draft courses" class="green small" />
                </div>
            </div>
        )
    }
}

export default Timetable;