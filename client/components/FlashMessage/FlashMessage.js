import React from 'react';
import Ionicon from 'react-ionicons'
import 'client/components/FlashMessage/flash-message.scss';

const FlashMessage = (props) => {
    return (
        <div className="flashMessage">
            <Ionicon className="icon" color="#BD7D48" icon="ion-information-circled"/>
            <p>{props.message}</p>
        </div>
    )
};

export default FlashMessage;