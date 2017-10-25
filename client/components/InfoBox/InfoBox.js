import React, {Component} from 'react';
import 'client/components/InfoBox/info-box.scss';

const InfoBox = (props) => {
    return (
        <div className="infobox">
            <div className="icon" />
            <div className="content">
                <p className="content-value">{props.value}<span>ECTS</span></p>
                <p className="content-description">{props.description}</p>
            </div>
        </div>
    )
}

export default InfoBox;