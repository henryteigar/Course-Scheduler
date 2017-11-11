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
            {props.courses.map((row) =>
                <tr key={row.id}>
                    <td><CheckBox changeHandler={props.changeHandler} value={row} classes="blue small"/></td>
                    <td>{row.courseName}</td>
                    <td>{row.credits}</td>
                    <td>{row.regPersons}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;