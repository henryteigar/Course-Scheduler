import React, {Component} from 'react';

import RegisteredCoursesTable from 'client/components/RegisteredCoursesTable/RegisteredCoursesTable'

import RegisteredCoursesStore from 'client/stores/RegisteredCoursesStore';
import * as RegisteredCoursesAction from 'client/actions/RegisteredCoursesAction';

import 'client/containers/MainContainer/ContentWrapper/RegisteredCoursesArea/registered-courses-area.scss';

class RegisteredCoursesArea extends Component {
    constructor(props) {
        super(props);
        RegisteredCoursesAction.fetchRegisteredCourses();
        this.state = {
            courses: RegisteredCoursesStore.getAll()
        }
    }

    componentWillMount() {
        RegisteredCoursesStore.on("change", () => {
            this.setState({
                courses: RegisteredCoursesStore.getAll(),
            })
        });
    }

    getRegisteredCourseTable() {
        return (this.state.courses.length > 0) ?
            <RegisteredCoursesTable courses={this.state.courses.map((course) => course.course)} /> : null;
    }

    render() {
        return (
            <div className="registered-courses-area">
                <h2>Registered courses</h2>
                <hr />
                {this.getRegisteredCourseTable()}
            </div>
        )
    }
}

export default RegisteredCoursesArea;