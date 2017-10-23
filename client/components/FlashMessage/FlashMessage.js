import React from 'react';
import 'client/components/FlashMessage/flash-message.scss';

const FlashMessage = (props) => {
    return (
        <div className="flashMessage">
            <p>{props.message}</p>
        </div>
    )
};

export default FlashMessage;