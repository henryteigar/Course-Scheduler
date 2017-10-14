import React from 'react';

import '../../css/components/button.scss'

const Button = (props) => {
    return (
        <button onClick={props.clickHandler} className={props.class}>{props.name}</button>
    )
};

export default Button;