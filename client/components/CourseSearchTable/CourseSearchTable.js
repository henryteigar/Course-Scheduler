import React from 'react';

import './course-search-table.scss';
import CheckBox from "../CheckBox/CheckBox";

const CourseSearchTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
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
                    <tr key={course.title}>
                        {!props.draftedCourses.includes(course)?
                            <td>
                                <CheckBox changeHandler={props.changeHandler} value={course} classes="blue small"/>
                            </td>:<td></td>}
                        <td>{course.title}</td>
                        <td>{course.credits} EAP</td>
                        <td>{course.schedule}</td>
                        <td>{course.responsibleLecturer}</td>
                        <td>{course.currentAttendants}/{course.maxAttendants}</td>
                        <td>{course.cancellationDeadline}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;