import React from 'react';

import CheckBox from "../CheckBox/CheckBox";

import 'client/components/DraftTable/draft-table.scss';

function groupPreference(course, modalId) {
    let rowContent;

    if (course.locked_groups) {
        rowContent =
            <div>
                <img height='18' src="../../images/lock.svg" className="lock-icon" />
                <span className="green">{course.locked_groups.map((group) => group.name).join(", ")}</span>
            </div>
    } else {
        rowContent =
            <div>
                <img height='18' src="../../images/unlock.svg" className="lock-icon" />
                <span>Lock group preference</span>
            </div>
    }

    return (
        <div className="preference" onClick={function openModal(){ openGroupSelectModal(modalId) }}>
            { rowContent }
        </div>
    )
}

function openGroupSelectModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
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
                    <td>{groupPreference(draftedCourse, props.modalId)}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default DraftTable;