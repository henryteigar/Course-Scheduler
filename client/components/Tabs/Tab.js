import React from 'react';

import './tab.scss';

const Tab = (props) => {
    let clickHandler = () => props.clickHandler(props.value);

    return (
        <li onClick={clickHandler} id={props.value}
            className={(props.value === props.activeTab) ? `active tab` : `tab`}>
            {props.text}
        </li>
    )
};

export default Tab;