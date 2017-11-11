import React, { Component } from 'react';
import FlashMessage from 'client/components/FlashMessage/FlashMessage'
import InfoBoxContainer from './InfoBoxContainer/InfoBoxContainer'
import SearchArea from './SearchArea/SearchArea'
import DraftArea from './DraftArea/DraftArea'
import RegisteredCoursesArea from './RegisteredCoursesArea/RegisteredCoursesArea'
import Timetable from './Timetable/Timetable'

import 'client/containers/MainContainer/ContentWrapper/content-wrapper.scss';

class ContentWrapper extends Component {

    constructor() {
        super();
        this.state = {
            flashMessage: "Registration for the next semester's courses starts on May 15"
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <FlashMessage message={this.state.flashMessage}/>
                <InfoBoxContainer />
                <SearchArea />
                <DraftArea />
                <RegisteredCoursesArea />
                <Timetable />
            </div>
        )
    }
}

export default ContentWrapper;