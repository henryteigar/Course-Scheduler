import React, { Component } from 'react';
import FlashMessage from './FlashMessage/FlashMessage'
import InfoBox from './InfoBox/InfoBox'

import '../../../css/components/content-wrapper.scss';

class ContentWrapper extends Component {
    render() {
        return (
            <div className="contentWrapper">
                <FlashMessage />

                <InfoBox/>
                <InfoBox/>
                <InfoBox/>
            </div>
        )
    }
}

export default ContentWrapper;