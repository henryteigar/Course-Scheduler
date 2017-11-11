import React from 'react';

import CheckBox from "../CheckBox/CheckBox";

const CourseSearchTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th/>
                <th>Course name</th>
                <th>Credits</th>
                <th>Reg. persons</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((course) =>
                <tr key={course.id}>
                    <td><CheckBox changeHandler={props.changeHandler} value={course} classes="blue small"/></td>
                    <td>{course.courseName}</td>
                    <td>{course.credits} EAP</td>
                    <td>{course.regPersons}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;