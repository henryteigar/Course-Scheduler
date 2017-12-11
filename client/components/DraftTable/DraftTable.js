import React, {Component} from 'react';

import CheckBox from "client/components/CheckBox/CheckBox";
import Modal from 'client/components/Modal/Modal';
import SmartGroupSelector from 'client/components/SmartGroupSelector/SmartGroupSelector';

import 'client/components/DraftTable/draft-table.scss';

class DraftTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            child: null,
        };
        this.groupLockModalId = "lock-group-preference-modal";
    }

    groupPreference(draftedCourse) {
        let rowContent;

        if (draftedCourse.has_group_system == false) {
            rowContent = null;
        }

        else if (draftedCourse.locked_groups) {
            rowContent =
                <div>
                    <img height='18' src="../../images/lock.svg" className="lock-icon" />
                    <span className="green">{draftedCourse.locked_groups.map((group) => group.name).join(", ")}</span>
                </div>
        } else {
            rowContent =
                <div>
                    <img height='18' src="../../images/unlock.svg" className="lock-icon" />
                    <span>Lock group</span>
                </div>
        }

        return (
            <div className="preference" onClick={() => this.openGroupSelectModal(draftedCourse)}>
                {rowContent}
            </div>
        )
    }

    closeGroupSelectModal() {
        let modal = document.getElementById(this.groupLockModalId);
        modal.style.display = "none";
    }

    openGroupSelectModal(draftedCourse) {
        let modal = document.getElementById(this.groupLockModalId);
        modal.style.display = "block";

        let child = <SmartGroupSelector modalId={this.groupLockModalId} closeModal={this.closeGroupSelectModal.bind(this)} course={draftedCourse} />
        this.setState({ child });
    }

    render() {
        return (
            <div>
                <Modal child={this.state.child} id={this.groupLockModalId}
                       heading="Lock group preference" showX />

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
                    {this.props.courses.map((draftedCourse) =>
                        <tr key={draftedCourse.course.id}>
                            <td><CheckBox changeHandler={this.props.changeHandler} value={draftedCourse}
                                          classes="blue small" /></td>
                            <td>{draftedCourse.course.name_eng}</td>
                            <td>{draftedCourse.course.credits} EAP</td>
                            <td>{draftedCourse.course.reg_persons_info}</td>
                            <td>{this.groupPreference(draftedCourse)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default DraftTable;