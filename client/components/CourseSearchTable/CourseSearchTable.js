import React from 'react';

import './course-search-table.scss';
import CheckBox from "../CheckBox/CheckBox";

const CourseSearchTable = (props) => {
    return (
        <table className="course-search-table">
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
                {props.courses.map((row) =>
                    <tr key={row.title}>
                        <td><CheckBox changeHandler={props.changeHandler} value={row}/></td>
                        <td>{row.title}</td>
                        <td>{row.credits} EAP</td>
                        <td>{row.schedule}</td>
                        <td>{row.responsibleLecturer}</td>
                        <td>{row.currentAttendants}/{row.maxAttendants}</td>
                        <td>{row.cancellationDeadline}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;