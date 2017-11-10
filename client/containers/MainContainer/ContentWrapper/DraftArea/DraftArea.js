import React, {Component} from 'react';

import 'client/containers/MainContainer/ContentWrapper/DraftArea/draft-area.scss';

class DraftArea extends Component {
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