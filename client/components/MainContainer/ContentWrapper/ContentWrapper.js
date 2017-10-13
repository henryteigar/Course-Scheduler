import React, { Component } from 'react';
import FlashMessage from './FlashMessage/FlashMessage'
import InfoBoxContainer from './InfoBoxContainer/InfoBoxContainer'

import '../../../css/components/content-wrapper.scss';

class ContentWrapper extends Component {
    render() {
        return (
            <div className="contentWrapper">
                <FlashMessage />
                <InfoBoxContainer />
            </div>
        )
    }
}

export default ContentWrapper;