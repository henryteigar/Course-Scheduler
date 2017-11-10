import React from 'react';

import CheckBox from "../CheckBox/CheckBox";

const CourseSearchTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th></th>
                <th>Course name</th>
                <th>Credits</th>
                <th>Reg. persons</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((row) =>
                <tr key={row.title}>
                    <td><CheckBox changeHandler={props.changeHandler} value={row} classes="blue small"/></td>
                    <td>{row.title}</td>
                    <td>{row.credits} EAP</td>
                    <td>{row.currentAttendants}/{row.maxAttendants}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;