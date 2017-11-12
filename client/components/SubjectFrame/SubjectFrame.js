import React from 'react';

import './subject-frame.scss'

const SubjectFrame = (props) => {

    let occurrence = props.occurrence;
    let frameStyle = {
        top: (occurrence.time.start_hour - 8) * 60 * 0.7 + occurrence.time.start_minute * 0.7,
        height: occurrence.time.length * 0.7
    };

    let startHour = occurrence.time.start_hour.toString().length === 1 ? '0' + occurrence.time.start_hour : occurrence.time.start_hour

    return (
        <div className={"subject-frame" + (occurrence.isDraft ? " draft" : "")} style={frameStyle}>
            <div className="upper-info">
                <label className="time">{startHour} : {occurrence.time.start_minute}</label>
                <label className="group">{occurrence.group.name}</label>
            </div>

            <label className="name">{occurrence.name}</label>

            <div className="lower-info">
                <label className="type">{occurrence.type === 'lecture' ? 'LECTURE' : 'PRACTICE'}</label>
                <label className="additional-info">{occurrence.isDraft ? <b>DRAFT</b> : occurrence.place}</label>
            </div>
        </div>
    )
};

export default SubjectFrame;