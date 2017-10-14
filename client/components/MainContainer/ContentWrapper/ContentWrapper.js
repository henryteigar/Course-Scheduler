import React, { Component } from 'react';
import FlashMessage from './FlashMessage/FlashMessage'
import InfoBoxContainer from './InfoBoxContainer/InfoBoxContainer'
import SearchArea from './SearchArea/SearchArea'

import '../../../css/components/content-wrapper.scss';

class ContentWrapper extends Component {
    render() {
        return (
            <div className="contentWrapper">
                <FlashMessage />
                <InfoBoxContainer />
                <SearchArea />
            </div>
        )
    }
}

export default ContentWrapper;