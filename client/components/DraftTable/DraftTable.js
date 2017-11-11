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
<<<<<<< HEAD
                    <td>{row.courseName}</td>
                    <td>{row.credits}</td>
                    <td>{row.regPersons}</td>
=======
                    <td>{row.title}</td>
                    <td>{row.credits} EAP</td>
                    <td>{row.currentAttendants}/{row.maxAttendants}</td>
>>>>>>> c620894b8df139173e5378b73db904f4113950d9
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default CourseSearchTable;