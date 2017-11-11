import React from 'react';

import './course-search-table.scss';
import CheckBox from "../CheckBox/CheckBox";

const CourseSearchTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th />
                <th>Course name</th>
                <th>Credits</th>
                <th>Schedule</th>
                <th>Lecturer</th>
                <th>Reg. persons</th>
                <th>Cancellation date</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((course) =>
                <tr key={course.id}>
                    {!props.disabledCourses.includes(course) ?
                        <td>
                            <CheckBox changeHandler={props.changeHandler} value={course} classes="blue small" />
                        </td> : <td />}
                    <td>{course.courseName}</td>
                    <td>{course.credits} EAP</td>
                    <td>{course.schedule}</td>
                    <td>{course.lecturer}</td>
                    <td>{course.regPersons}</td>
                    <td>{course.cancellationDeadline}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;