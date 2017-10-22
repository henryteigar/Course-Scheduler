import React, {Component} from 'react';
import 'client/css/components/info-box.scss';

const InfoBox = (props) => {
    return (
        <div className="infobox">
            <div className="icon" />
            <div className="content">
                <p className="content-value">{props.value}<span>EAP</span></p>
                <p className="content-description">{props.description}</p>
            </div>
        </div>
    )
}

export default InfoBox;