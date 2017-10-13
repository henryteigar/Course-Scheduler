import React, {Component} from 'react';
import '../../../../../css/components/info-box.scss';

class InfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            description: props.description
        }
    }
    render() {
        return (
            <div className="infobox">
                <div className="icon" />
                <div className="content">
                    <p className="content-value">{this.state.value}<span>EAP</span></p>
                    <p className="content-description">{this.state.description}</p>
                </div>
            </div>
        )
    }
}

export default InfoBox;