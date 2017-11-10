import React, {Component} from 'react';

import DraftTable from "../../../../components/DraftTable/DraftTable";

import CourseDraftStore from 'client/stores/CourseDraftStore';

import 'client/containers/MainContainer/ContentWrapper/DraftArea/draft-area.scss';
import Button from "../../../../components/Button/Button";

class DraftArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentWillMount() {
        CourseDraftStore.on("change", () => {
            this.setState({
                courses: CourseDraftStore.getAll()
            })
        });
    }

    render() {
        let searchResultArea = null;
        if (this.state.courses.length > 0) {
            searchResultArea =
                <div>
                    <DraftTable courses={this.state.courses}/>
                    <div className="button-area">
                        <Button class="small red" name="Remove from draft"/>
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