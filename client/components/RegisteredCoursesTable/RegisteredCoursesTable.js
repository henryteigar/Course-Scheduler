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
                <th>Lecturer</th>
                <th>Cancellation date</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((course) =>
                <tr key={course.id}>
                    <td>{course.name_eng}</td>
                    <td>{course.credits}</td>
                    <td>{course.responsible_lecturer_name}</td>
                    <td>{course.cancellation_date}</td>
                    <td>
                        <span onClick={() => RegisteredCoursesAction.removeFromDraft(course)}>
                            <Ionicon className="remove-icon" color="#BD5E5E" icon="ion-close" />
                        </span>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default RegisteredCoursesTable;