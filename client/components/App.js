import React, {Component} from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {name: "test"}
    }

    render() {
        return (
            <div>

                <p>{this.state.name}</p>
                <button>TO</button>
            </div>

        )
    }
}

export default App;