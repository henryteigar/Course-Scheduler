import React, {Component} from 'react';

import DraftTable from "client/components/DraftTable/DraftTable";
import Button from "client/components/Button/Button";
import Modal from "client/components/Modal/Modal";

import * as CourseDraftAction from 'client/actions/CourseDraftAction';
import CourseDraftStore from 'client/stores/CourseDraftStore';

import 'client/containers/MainContainer/ContentWrapper/DraftArea/draft-area.scss';

class DraftArea extends Component {

    constructor(props) {
        super(props);
        CourseDraftAction.fetchDraftedCourses();
        this.state = {
            courses: [],
            selectedCourses: []
        }

        this.groupLockModalId = "lock-group-preference-modal";
    }

    componentWillMount() {
        CourseDraftStore.on("change", () => {
            this.setState({
                courses: CourseDraftStore.getAll(),
            })
        });
    }

    toggleCourse(course) {
        let courses = this.state.selectedCourses;

        if (courses.includes(course)) {
            courses = courses.filter(el => el !== course);
        } else {
            courses.push(course);
        }
        this.setState({selectedCourses: courses});
    }

    removeFromDraft() {
        CourseDraftAction.removeFromDraft(this.state.selectedCourses);
        this.setState({
            selectedCourses: [],
            courses: CourseDraftStore.getAll()
        });
    }

    getResultArea() {
        let searchResultArea;

        if (this.state.courses.length > 0) {
            searchResultArea =
                <div>
                    <DraftTable modalId={this.groupLockModalId} courses={this.state.courses} changeHandler={this.toggleCourse.bind(this)} />
                    <div className="button-area">
                        <Button class="small red" name="Remove from draft"
                                clickHandler={this.removeFromDraft.bind(this)} />
                    </div>
                    <div className="button-area">
                        <Button class="small blue disabled" name="Put automatically to timetable" />
                    </div>
                </div>
        }

        return searchResultArea;
    }

    lockGroupModal() {
        <div>Jou</div>
    }

    render() {
        return (
            <div className="draft-area">

                <Modal child={this.lockGroupModal()} id={this.groupLockModalId}
                       heading="Lock group preference" showX />

                <h2>Courses in draft</h2>
                <hr />
                {this.getResultArea()}
            </div>
        )
    }
}

export default DraftArea;