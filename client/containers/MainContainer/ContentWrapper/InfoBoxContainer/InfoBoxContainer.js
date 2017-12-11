import React, {Component} from 'react';
import InfoBox from 'client/components/InfoBox/InfoBox'
import 'client/containers/MainContainer/ContentWrapper/InfoBoxContainer/info-box-container.scss';

class InfoBoxContainer extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            infoBox: [
                {
                    value: "",
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

    getTotalCreditString () {
        if (this.props.user) {
            const obligatoryCredits = parseInt(this.props.user.obligatory_credits);
            const electiveCredits = parseInt(this.props.user.elective_credits);
            const optionalCredits = parseInt(this.props.user.optional_credits);

            const totalCredits = obligatoryCredits + electiveCredits + optionalCredits;

            return (this.props.user ? totalCredits + "/180" : "")
        } else {
            return ""
        }
    }

    genElectiveCreditString () {
        if (this.props.user) {
            const electiveCredits = parseInt(this.props.user.elective_credits);

            return (this.props.user ? electiveCredits : "")
        } else {
            return ""
        }
    }

    genOptionalCreditString () {
        if (this.props.user) {
            const optionalCredits = parseInt(this.props.user.optional_credits);

            return (this.props.user ? optionalCredits : "")
        } else {
            return ""
        }
    }

    render() {
        console.log(this.props.user)
        return (
            <div className="infoBoxContainer">
                <InfoBox value={this.getTotalCreditString()} description={this.state.infoBox[0].description}/>
                <InfoBox value={this.genElectiveCreditString()} description={this.state.infoBox[1].description}/>
                <InfoBox value={this.genOptionalCreditString()} description={this.state.infoBox[2].description}/>
            </div>
        )
    }
}

export default InfoBoxContainer;