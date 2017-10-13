import React, { Component } from 'react';
import FlashMessage from './FlashMessage/FlashMessage'

import '../../../css/components/content-wrapper.scss';

class ContentWrapper extends Component {
    render() {
        return (
            <div className="contentWrapper">
                <FlashMessage />
            </div>
        )
    }
}

export default ContentWrapper;