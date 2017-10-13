import React, { Component } from 'react';

import '../../../../css/components/profile.scss'

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "John Doe",
            studentId: "B33043"
        }
    }

    render() {
        return (
            <div className="profile">
                <div className="profile-info">
                    <p className="name">{this.state.name}</p>
                    <p className="studentId">{this.state.studentId}</p>
                </div>
                <div className="profile-pic" />
            </div>
        )
    }
}

export default Profile;