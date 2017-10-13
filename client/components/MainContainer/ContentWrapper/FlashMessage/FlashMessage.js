import React, { Component } from 'react';
import '../../../../css/components/flash-message.scss';

class ContentWrapper extends Component {
    render() {
        return (
            <div className="flashMessage">
                <p>Registreerimine järgmise semestri ainetele algab 15.mail</p>
            </div>
        )
    }
}

export default ContentWrapper;