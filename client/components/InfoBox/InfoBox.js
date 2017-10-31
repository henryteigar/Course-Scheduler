import React, {Component} from 'react';
import Ionicon from 'react-ionicons'
import 'client/components/InfoBox/info-box.scss';

const InfoBox = (props) => {
    return (
        <div className="infobox">
            <Ionicon className="icon" color="#385A7C" icon="ion-compose"/>
            <div className="content">
                <p className="content-value">{props.value}<span>ECTS</span></p>
                <p className="content-description">{props.description}</p>
            </div>
        </div>
    )
}

export default InfoBox;