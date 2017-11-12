import React from 'react';

import './subject-frame.scss'

const SubjectFrame = (props) => {

    const frameStyle = {
        top: (props.occurrence.time.start_hour - 8) * 40
    };

    return (
        <div className="subject-frame" style={frameStyle}>
            <div className="upper-info">
                <label className="time">{props.occurrence.time.start_hour} : {props.occurrence.time.start_minute}</label>
                <label className="group">I group</label>
            </div>

            <label className="name">{props.occurrence.name}</label>

            <div className="lower-info">
                <label className="type">{props.occurrence.occurrenceType}</label>
                <label className="location">Liivi 2 - 404</label>
            </div>
        </div>
    )
};

export default SubjectFrame;