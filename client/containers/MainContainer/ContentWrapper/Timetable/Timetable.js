import React, {Component} from 'react';

import './timetable.scss';
import Grid from "./Grid/Grid";
import Button from "client/components/Button/Button";
import TimetableTimeBar from "client/components/TimetableTimeBar/TimetableTimeBar";
import CourseDraftStore from 'client/stores/CourseDraftStore';
import RegisteredCoursesStore from 'client/stores/RegisteredCoursesStore';


class Timetable extends Component {
    constructor() {
        super();
        this.state = {
            courses: {
                draftedCourses: CourseDraftStore.getAll(),
                registeredCourses: RegisteredCoursesStore.getAll()
            }
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
                <h2>Timetable</h2>
                <hr />
                <TimetableTimeBar />
                {console.log("state chnaged")}
                <Grid courses={this.state.courses} />
                <div className="register-btn">
                    <Button name="Register draft courses" class="green small disabled" />
                </div>
            </div>
        )
    }
}

export default Timetable;