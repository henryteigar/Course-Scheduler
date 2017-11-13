import React from 'react';
import Ionicon from 'react-ionicons'

import * as RegisteredCoursesAction from 'client/actions/RegisteredCoursesAction';

import 'client/components/RegisteredCoursesTable/registered-courses-table.scss';

const RegisteredCoursesTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Course name</th>
                <th>Credits</th>
                <th>Group</th>
                <th>Cancellation date</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {props.registeredCourses.map((registeredCourse) =>
                <tr key={registeredCourse.course.id}>
                    <td>{registeredCourse.course.name_eng}</td>
                    <td>{registeredCourse.course.credits} EAP</td>
                    <td>{registeredCourse.locked_group.name}</td>
                    <td>{registeredCourse.course.cancellation_date}</td>
                    <td><span onClick={() => RegisteredCoursesAction.removeFromDraft(registeredCourse.course)}><Ionicon className="remove-icon" color="#BD5E5E" icon="ion-close" /></span></td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default RegisteredCoursesTable;