import React, {Component} from 'react';

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
        return (
            <div className="draft-area">
                <h2>Courses in draft</h2>
                <hr/>
            </div>
        )
    }
}

export default DraftArea;