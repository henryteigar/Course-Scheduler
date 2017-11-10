import React, {Component} from 'react';

import DraftTable from "../../../../components/DraftTable/DraftTable";

import CourseDraftStore from 'client/stores/CourseDraftStore';

import 'client/containers/MainContainer/ContentWrapper/DraftArea/draft-area.scss';

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
            searchResultArea = <DraftTable courses={this.state.courses}/>
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