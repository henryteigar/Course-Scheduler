import React, {Component} from 'react';
import 'client/components/CheckBox/checkbox.scss'

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeHandler: props.changeHandler,
            value: props.value
        }
    }

    render() {
        let changeHandler = () => this.state.changeHandler(this.state.value);

        return (
            <label className="checkbox_container">
                <input type="checkbox" onChange={changeHandler}/>
                    <span className="check_mark"/>
            </label>

        );
    }
}
export default CheckBox;