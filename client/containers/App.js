import React, { Component } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import MainContainer from './MainContainer/MainContainer';

import '../css/main.scss'

class App extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <MainContainer />
            </div>
        )
    }
}

export default App;