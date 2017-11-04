import React, {Component} from 'react';
import 'client/components/CheckBox/checkbox.scss'

class CheckBox extends Component {
    constructor() {
        super();
        this.clicked = false;
    }

    changeState() {
        this.clicked = !this.clicked;
        console.log(this.clicked);

    }

    render() {
        return (
            <label className="checkbox_container">
                <input type="checkbox" onChange={this.changeState}/>
                    <span className="check_mark"/>
            </label>

        );
    }
}
export default CheckBox;