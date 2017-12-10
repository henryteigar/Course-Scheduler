import React, { Component } from 'react';

import 'client/components/Profile/profile.scss'
import DetailedProfileBox from './DetailedProfileBox/DetailedProfileBox';


const Profile = (props) => {
    return (
        <div className="profile">
            <img onClick={props.clickHandler} className="profile-pic" src={props.user !== null && props.user.id % 2 === 0 ? "../../images/user1.svg" : "../../images/user4.svg"}/>
            <DetailedProfileBox user={props.user} clickHandler={props.clickHandler} logoutHandler={props.logoutHandler} class={props.showDetailedBox ? "" : "hidden"}/>
        </div>
    )
};

export default Profile;