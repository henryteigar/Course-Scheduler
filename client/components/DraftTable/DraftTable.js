import React from 'react';

import CheckBox from "../CheckBox/CheckBox";
import DropdownSelectBox from 'client/components/DropdownSelectBox/DropdownSelectBox';

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
                    <td><DropdownSelectBox key={draftedCourse.course.id} id={draftedCourse.course.id}
                                           className="full-width"
                                           values={draftedCourse.course.occurrences
                                               .filter((el) => el.type == "practice")
                                               .map((el) => { return { id: el.group.id, label_eng: el.group.name }})}
                                           clickHandler={console.log} /></td>
                    <td>{draftedCourse.active_group ? draftedCourse.active_group.name : null}</td>
                    <td>{draftedCourse.active_group ? draftedCourse.active_lecturer.name : null}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default DraftTable;