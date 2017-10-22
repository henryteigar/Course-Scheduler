import React, { Component } from 'react';
import FlashMessage from 'client/components/FlashMessage/FlashMessage'
import InfoBoxContainer from './InfoBoxContainer/InfoBoxContainer'
import SearchArea from './SearchArea/SearchArea'

import 'client/css/components/content-wrapper.scss';

class ContentWrapper extends Component {
    constructor() {
        super();
        this.state = {
            flashMessage: "Registreerimine järgmise semestri ainetele algab 15.mail"
        }
    }
    render() {
        return (
            <div className="contentWrapper">
                <FlashMessage message={this.state.flashMessage}/>
                <InfoBoxContainer />
                <SearchArea />
            </div>
        )
    }
}

export default ContentWrapper;