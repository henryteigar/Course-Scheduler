import React, { Component } from 'react';

import 'client/components/Profile/profile.scss'
import DetailedProfileBox from './DetailedProfileBox/DetailedProfileBox';


const Profile = (props) => {
    return (
        <div className="profile">
            <img className="profile-pic" src="../../images/user4.svg"/>
            <DetailedProfileBox />
        </div>
    )
};

export default Profile;