import React, {Component} from 'react';
import 'client/components/CheckBox/checkbox.scss'

class CheckBox extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false
        };
    }

    changeState() {
        this.clicked = !this.clicked
    }

    render() {
        return (
            <div className="checkbox">
                <input type="checkbox" className="checkbox" id="checkboxInput" onChange={this.changeState()}/>
            </div>
        );
    }
}
export default CheckBox;