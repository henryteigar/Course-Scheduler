import React, {Component} from 'react';
import '../../../../../css/components/main-search-box.scss';

class MainSearchBox extends Component {

    handleChange(e) {
        this.props.updateQuery(e.target.value);
    }

    render() {
        return (
            <input className="searchBox" onChange={this.handleChange.bind(this)}
                   placeholder="Otsi aine koodi, nime, teaduskonda..."/>
        )
    }
}

export default MainSearchBox;