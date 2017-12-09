import React from 'react';

import CheckBox from "../CheckBox/CheckBox";

import 'client/components/DraftTable/draft-table.scss';

const groupPreference = (course) => {
    if (course.locked_groups) {
        return <div className="preference">
            <img height='18' src="../../images/lock.svg" className="lock-icon" />
            <span className="green">{course.locked_groups.map((group) => group.name).join(", ")}</span>
        </div>
    } else {
        return <div className="preference">
            <img height='18' src="../../images/unlock.svg" className="lock-icon" />
            <span>Lock group preference</span>
        </div>;
    }
}

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
                    <td>{draftedCourse.course.reg_persons_info}</td>
                    <td>{groupPreference(draftedCourse)}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default DraftTable;