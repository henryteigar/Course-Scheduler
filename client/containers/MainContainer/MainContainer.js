import React, { Component } from 'react';

import Header from './Header/Header'
import ContentWrapper from './ContentWrapper/ContentWrapper'
import 'client/containers/MainContainer/main-container.scss';

class MainContainer extends Component {

    render() {
        return (
            <div className="main-container">
                <Header user={this.props.user}/>
                <ContentWrapper user={this.props.user}/>
            </div>
        )
    }
}

export default MainContainer;