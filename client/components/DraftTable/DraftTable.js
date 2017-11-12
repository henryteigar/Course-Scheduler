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
                <th>Preferences</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((draftedCourse) =>
                <tr key={draftedCourse.course.id}>
                    <td><CheckBox changeHandler={props.changeHandler} value={draftedCourse} classes="blue small" /></td>
                    <td>{draftedCourse.course.name_eng}</td>
                    <td>{draftedCourse.course.credits} EAP</td>
                    <td>{draftedCourse.course.reg_persons}</td>
                    <td>{draftedCourse.active_group ? draftedCourse.active_group.name : null}</td>
                    <td>{draftedCourse.active_group ? draftedCourse.active_lecturer.name : null}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default DraftTable;