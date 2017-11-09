import React from 'react';
import './underlined-input-field.scss'

const UnderlinedInputField = (props) => {
    return (
        <input className="underlined-input" type={props.type}
               placeholder={props.placeholder}/>
    )
};

export default UnderlinedInputField;