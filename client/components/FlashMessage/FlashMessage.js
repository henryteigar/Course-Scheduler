import React from 'react';
import '../../css/components/flash-message.scss';

const FlashMessage = (props) => {
    return (
        <div className="flashMessage">
            <p>{props.message}</p>
        </div>
    )
};

export default FlashMessage;