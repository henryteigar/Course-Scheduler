import React from 'react';

import 'client/css/components/button.scss'

const Button = (props) => {
    return (
        <button onClick={props.clickHandler} className={props.class}>{props.name}</button>
    )
};

export default Button;