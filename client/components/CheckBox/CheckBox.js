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
            <label className="checkbox_container">
                <input type="checkbox" onChange={this.changeState()}/>
                    <span className="checkmark"/>
            </label>

        );
    }
}
export default CheckBox;