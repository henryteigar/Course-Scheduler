import React, { Component } from 'react';

import 'client/components/Profile/profile.scss'

const Profile = (props) => {
    return (
        <div className="profile">
            <div className="profile-info">
                <p className="name">{props.name}</p>
                <p className="studentId">{props.studentId}</p>
            </div>
            <div className="profile-pic" />
        </div>
    )
};

export default Profile;