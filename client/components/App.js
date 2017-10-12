
import React, { Component } from 'react';
import Test from './Test';

import './app.css'

class App extends Component {
    constructor() {
        super();
        this.state = {name: "tesaset"}
    }

    render() {
        return (
            <div className="main">
                <p className="red">Testtest</p>
                <p>{this.state.name}</p>
                <Test />
                <button>TO</button>
            </div>
        )
    }
}

export default App;