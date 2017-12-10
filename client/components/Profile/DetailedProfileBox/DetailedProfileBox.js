import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './detailed-profile-box.scss'


const DetailedProfileBox = (props) => {
    return (
        <div className={"detailed-profile-box " + props.class}>
            <img src="../../images/user4.svg"/>
            <div className="info-text">
                {console.log(props.user)}
                <p className="name">{props.user !== null ? props.user.name : ""}</p>
                <p className="email">student@ut.ee</p>
                <p className="student-id">{props.user !== null ? props.user.nr_of_study_book : ""}</p>
            </div>
            <div className="buttons">
                <Link to='' onClick={props.clickHandler} className="link">Settings</Link>
                <Link to='/login' onClick={props.logoutHandler} className="link">Sign out</Link>
            </div>
        </div>
    )
};

export default DetailedProfileBox;