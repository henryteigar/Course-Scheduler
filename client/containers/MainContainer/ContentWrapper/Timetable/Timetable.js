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
            weeks: [
                {
                    nr: 24,
                    startDate: new Date(2018, 1, 12)
                },
                {
                    nr: 25,
                    startDate: new Date(2018, 1, 19)
                },
                {
                    nr: 26,
                    startDate: new Date(2018, 1, 26)
                },
                {
                    nr: 27,
                    startDate: new Date(2018, 2, 5)
                },
                {
                    nr: 28,
                    startDate: new Date(2018, 2, 12)
                },
                {
                    nr: 29,
                    startDate: new Date(2018, 2, 19)
                },
                {
                    nr: 30,
                    startDate: new Date(2018, 2, 26)
                },
                {
                    nr: 31,
                    startDate: new Date(2018, 3, 2)
                },
                {
                    nr: 32,
                    startDate: new Date(2018, 3, 9)
                },
                {
                    nr: 33,
                    startDate: new Date(2018, 3, 16)
                },
                {
                    nr: 34,
                    startDate: new Date(2018, 3, 23)
                },
                {
                    nr: 35,
                    startDate: new Date(2018, 3, 30)
                }, {
                    nr: 36,
                    startDate: new Date(2018, 4, 7)
                },
                {
                    nr: 37,
                    startDate: new Date(2018, 4, 14)
                },
                {
                    nr: 38,
                    startDate: new Date(2018, 4, 21)
                },
                {
                    nr: 39,
                    startDate: new Date(2018, 4, 28)
                }
            ],
            currentWeek: null
        };
    };

    componentWillMount() {
        this.setState({currentWeek: this.state.weeks[0]})

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

    handleBack(e) {
        let currentIndex = this.state.weeks.indexOf(this.state.currentWeek);
        if (currentIndex !== 0) {
            this.setState({currentWeek: this.state.weeks[currentIndex - 1]})
        }
    }

    handleForward(e) {
        let currentIndex = this.state.weeks.indexOf(this.state.currentWeek);
        if (currentIndex !== this.state.weeks.length - 1) {
            this.setState({currentWeek: this.state.weeks[currentIndex + 1]})
        }
    }

    render() {
        return (
            <div className="timetable">
                <div className="header">
                    <h2>Timetable</h2>
                    <WeekSelector weeks={this.state.weeks}
                                  currentWeek={this.state.currentWeek}
                                  forwardHandler={this.handleForward.bind(this)}
                                  backHandler={this.handleBack.bind(this)} />
                    <p className="warning">Conflicts on weeks: 3, 4, 5</p>
                </div>
                <hr />
                <TimetableTimeBar />
                <Grid courses={this.state.courses} currentWeek={this.state.currentWeek}/>
                <div className="register-btn">
                    <Button name="Register draft courses" class="green small disabled" />
                </div>
            </div>
        )
    }
}

export default Timetable;