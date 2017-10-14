import React, {Component} from 'react';
import '../../../../../css/components/info-box.scss';

class InfoBox extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="infobox">
                <div className="icon" />
                <div className="content">
                    <p className="content-value">{this.props.value}<span>EAP</span></p>
                    <p className="content-description">{this.props.description}</p>
                </div>
            </div>
        )
    }
}

export default InfoBox;