import React from 'react';

import './tab.scss';

const Tab = (props) => {
    return (
        <li className="tab">
            {props.text}
        </li>
    )
};

export default Tab;