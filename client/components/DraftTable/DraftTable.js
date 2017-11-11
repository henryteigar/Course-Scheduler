import React from 'react';

import CheckBox from "../CheckBox/CheckBox";

const DraftTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th />
                <th>Course name</th>
                <th>Credits</th>
                <th>Reg. persons</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((draftedCourse) =>
                <tr key={draftedCourse.course.id}>
                    <td><CheckBox changeHandler={props.changeHandler} value={draftedCourse} classes="blue small" /></td>
                    <td>{draftedCourse.course.title}</td>
                    <td>{draftedCourse.course.credit}</td>
                    <td>{draftedCourse.course.nr_of_registered}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default DraftTable;