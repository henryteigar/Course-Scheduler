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
                    {!props.disabledCoursesIds.includes(course.id) ?
                        <td>
                            <CheckBox changeHandler={props.rememberChangeHandler} value={course} classes="blue small" />
                        </td> : <td />}
                    <td>{course.name_eng}</td>
                    <td>{course.credits} EAP</td>
                    <td>{course.occurrence_days_eng}</td>
                    <td>{course.responsible_lecturer_name}</td>
                    <td>{course.reg_persons_info}</td>
                    <td>{course.cancellation_date}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;