import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './detailed-profile-box.scss'


const DetailedProfileBox = (props) => {
    return (
        <div className="detailed-profile-box">
            <img src="../../images/user4.svg"/>
            <div className="info-text">
                <p className="name">John Doe</p>
                <p className="email">john@doe.ut.ee</p>
                <p className="student-id">B33043</p>
            </div>
            <div className="buttons">
                <Link to='' className="link">Settings</Link>
                <Link to='/login' className="link">Sign out</Link>
            </div>
        </div>
    )
};

export default DetailedProfileBox;