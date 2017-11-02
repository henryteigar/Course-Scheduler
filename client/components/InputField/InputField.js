import React from 'react';
import 'client/components/InputField/input-field.scss'

const InputField = (props) => {
    return (
        <input className={props.class}
               type={props.type}
               placeholder={props.placeholder}/>
    )
};

export default InputField;