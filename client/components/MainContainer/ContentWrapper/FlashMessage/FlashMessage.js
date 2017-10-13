import React, { Component } from 'react';
import '../../../../css/components/flash-message.scss';

class FlashMessage extends Component {
    constructor() {
        super();
        this.state = {
            message: "Registreerimine järgmise semestri ainetele algab 15.mail"
        }
    }
    render() {
        return (
            <div className="flashMessage">
                <p>{this.state.message}</p>
            </div>
        )
    }
}

export default FlashMessage;