import React, {Component} from 'react';
import InfoBox from 'client/components/InfoBox/InfoBox'
import 'client/containers/MainContainer/ContentWrapper/InfoBoxContainer/info-box-container.scss';

class InfoBoxContainer extends Component {
    constructor() {
        super();
        this.state = {
            infoBox: [
                {
                    value: "108/120",
                    description: "ECTS taken from recommended amount"
                },
                {
                    value: "6/12",
                    description: "ECTS taken from elective courses"
                },
                {
                    value: "4/9",
                    description: "ECTS taken from optional courses"
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