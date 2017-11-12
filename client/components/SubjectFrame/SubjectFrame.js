import React from 'react';

import './subject-frame.scss'

const SubjectFrame = (props) => {

    let occurrence = props.occurrence;

    const frameStyle = {
        top: (occurrence.time.start_hour - 8) * 60 * 0.7 + occurrence.time.start_minute * 0.7,
        height: occurrence.time.length * 0.7

    };

    console.log(frameStyle.height)

    return (
        <div className="subject-frame" style={frameStyle}>
            <div className="upper-info">
                <label className="time">{props.occurrence.time.start_hour} : {props.occurrence.time.start_minute}</label>
                <label className="group">I group</label>
            </div>

            <label className="name">{props.occurrence.name}</label>

            <div className="lower-info">
                <label className="type">sss</label>
                <label className="location">Liivi 2 - 404</label>
            </div>
        </div>
    )
};

export default SubjectFrame;