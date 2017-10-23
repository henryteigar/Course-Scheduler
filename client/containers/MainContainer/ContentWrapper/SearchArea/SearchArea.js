import React, {Component} from 'react';

import * as SearchActions from 'client/actions/CourseSearchAction';
import SearchStore from 'client/stores/CourseSearchStore';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import CourseSearchTable from "client/components/CourseSearchTable/CourseSearchTable";
import Button from "client/components/Button/Button";

import 'client/containers/MainContainer/ContentWrapper/SearchArea/search-area.scss';

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: SearchStore.getAll(),
            query: ''
        };
    }

    updateQuery(e) {
        this.setState({"query": e.target.value});
    }

    componentWillMount() {
        SearchStore.on("change", () => {
            this.setState({
                courses: SearchStore.getAll()
            })
        });
    }

    handleClick() {
        SearchActions.searchCourses(this.state.query);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div className="searchArea">
                <h2>Ainete lisamine</h2>
                <hr/>
                <SearchBox updateQuery={this.updateQuery.bind(this)}
                           handleKeyPress={this.handleKeyPress.bind(this)}/>
                <div className="searchButton">
                    <Button class="big blue" name="Otsi" clickHandler={this.handleClick.bind(this)}/>
                </div>
                <CourseSearchTable courses={this.state.courses}/>
            </div>
        )
    }
}

export default SearchArea;