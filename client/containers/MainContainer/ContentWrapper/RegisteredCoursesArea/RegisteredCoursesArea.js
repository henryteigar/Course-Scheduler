import React, {Component} from 'react';

import 'client/containers/MainContainer/ContentWrapper/RegisteredCoursesArea/registered-courses-area.scss';

class RegisteredCoursesArea extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="registered-courses-area">
                <h2>Registered courses</h2>
                <hr />
            </div>
        )
    }
}

export default RegisteredCoursesArea;