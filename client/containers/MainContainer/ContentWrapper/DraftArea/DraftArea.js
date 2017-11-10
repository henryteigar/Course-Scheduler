import React, {Component} from 'react';

import DraftTable from "../../../../components/DraftTable/DraftTable";

import * as CourseDraftAction from 'client/actions/CourseDraftAction';
import CourseDraftStore from 'client/stores/CourseDraftStore';

import 'client/containers/MainContainer/ContentWrapper/DraftArea/draft-area.scss';
import Button from "../../../../components/Button/Button";

class DraftArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedCourses: []
        }
    }

    componentWillMount() {
        CourseDraftStore.on("change", () => {
            this.setState({
                courses: CourseDraftStore.getAll(),
                selectedCourses: []
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
        this.setState({courses: CourseDraftStore.getAll()});
    }

    render() {
        let searchResultArea = null;
        if (this.state.courses.length > 0) {
            searchResultArea =
                <div>
                    <DraftTable courses={this.state.courses} changeHandler={this.toggleCourse.bind(this)}/>
                    <div className="button-area">
                        <Button class="small red" name="Remove from draft"
                                clickHandler={this.removeFromDraft.bind(this)}/>
                    </div>
                    <div className="button-area">
                        <Button class="small blue" name="Put courses to schedule"/>
                    </div>
                </div>
        }
        return (
            <div className="draft-area">
                <h2>Courses in draft</h2>
                <hr/>
                {searchResultArea}
            </div>
        )
    }
}

export default DraftArea;