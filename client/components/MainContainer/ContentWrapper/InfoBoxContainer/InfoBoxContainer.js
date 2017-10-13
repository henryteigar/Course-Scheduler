import React, {Component} from 'react';
import InfoBox from './InfoBox/InfoBox'
import '../../../../css/components/info-box-container.scss';

class InfoBoxContainer extends Component {
    constructor() {
        super();
        this.state = {
            infoBox: [
                {
                    value: "128/120",
                    description: "Oled võtnud soovituslikust mahust"
                },
                {
                    value: "6/12",
                    description: "Oled võtnud valikaineid"
                },
                {
                    value: "9/15",
                    description: "Oled võtnud vabaaineid"
                }
            ]
        }
    }

    render() {
        return (
            <div className="infoBoxContainer">
                <InfoBox value={this.state.infoBox[0].value} description={this.state.infoBox[0].description}/>
                <InfoBox value={this.state.infoBox[1].value} description={this.state.infoBox[1].description}/>
                <InfoBox value={this.state.infoBox[2].value} description={this.state.infoBox[2].description}/>
            </div>
        )
    }
}

export default InfoBoxContainer;