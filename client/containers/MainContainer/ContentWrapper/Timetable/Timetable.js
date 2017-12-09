import React, {Component} from 'react';

import './timetable.scss';
import Grid from "./Grid/Grid";
import Button from "client/components/Button/Button";
import TimetableTimeBar from "client/components/TimetableTimeBar/TimetableTimeBar";
import CourseDraftStore from 'client/stores/CourseDraftStore';
import RegisteredCoursesStore from 'client/stores/RegisteredCoursesStore';
import WeekSelector from 'client/components/WeekSelector/WeekSelector';


class Timetable extends Component {
    constructor() {
        super();
        this.state = {
            courses: {
                draftedCourses: CourseDraftStore.getAll(),
                registeredCourses: RegisteredCoursesStore.getAll()
            },
            autumnWeeks2018: [
                {
                    nr: 1,
                    startDate: new Date(2018, 2, 12)
                },
                {
                    nr: 2,
                    startDate: new Date(2018, 2, 19)
                },
                {
                    nr: 3,
                    startDate: new Date(2018, 2, 26)
                },
                {
                    nr: 4,
                    startDate: new Date(2018, 3, 5)
                },
                {
                    nr: 5,
                    startDate: new Date(2018, 3, 12)
                },
                {
                    nr: 6,
                    startDate: new Date(2018, 3, 19)
                },
                {
                    nr: 7,
                    startDate: new Date(2018, 3, 26)
                },
                {
                    nr: 8,
                    startDate: new Date(2018, 4, 2)
                },
                {
                    nr: 9,
                    startDate: new Date(2018, 4, 9)
                },
                {
                    nr: 10,
                    startDate: new Date(2018, 4, 16)
                },
                {
                    nr: 11,
                    startDate: new Date(2018, 4, 23)
                },
                {
                    nr: 12,
                    startDate: new Date(2018, 4, 30)
                },{
                    nr: 13,
                    startDate: new Date(2018, 5, 7)
                },
                {
                    nr: 14,
                    startDate: new Date(2018, 5, 14)
                },
                {
                    nr: 15,
                    startDate: new Date(2018, 5, 21)
                },
                {
                    nr: 16,
                    startDate: new Date(2018, 5, 28)
                }
            ]
        };
    };

    componentWillMount() {
        CourseDraftStore.on("change", () => {
            let courses = this.state.courses;
            courses.draftedCourses = CourseDraftStore.getAll();
            this.setState({courses: courses})
        });
        RegisteredCoursesStore.on("change", () => {
            let courses = this.state.courses;
            courses.registeredCourses = RegisteredCoursesStore.getAll();
            this.setState({courses: courses})
        })
    }

    render() {
        return (
            <div className="timetable">
                <div className="header">
                    <h2>Timetable</h2>
                    <WeekSelector weeks={this.state.autumnWeeks2018}/>
                    <p className="warning">Conflicts on weeks: 3, 4, 5</p>
                </div>
                <hr />
                <TimetableTimeBar />
                <Grid courses={this.state.courses} />
                <div className="register-btn">
                    <Button name="Register draft courses" class="green small disabled" />
                </div>
            </div>
        )
    }
}

export default Timetable;