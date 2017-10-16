import React, {Component} from 'react';

import * as SearchActions from '../../../../actions/CourseSearchAction';
import SearchStore from '../../../../stores/CourseSearchStore';
import MainSearchBox from './MainSearchBox/MainSearchBox';
import CourseSearchTable from "../../../../components/CourseSearchTable/CourseSearchTable";
import Button from "../../../../components/Button/Button";

import '../../../../css/components/search-area.scss';

class SearchArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: SearchStore.getAll(),
            query: ''
        };
        SearchArea.handleClick = SearchArea.handleClick.bind(this);
    }

    updateQuery(query) {
        this.setState({query});
    }

    componentWillMount() {
        SearchStore.on("change", () => {
            this.setState({
                courses: SearchStore.getAll()
            })
        });
    }

    static handleClick() {
        SearchActions.searchCourses(this.state.query);
    }

    static handleKeyPress(e) {
        if (e.key === 'Enter') {
            SearchArea.handleClick();
        }
    }

    render() {
        return (
            <div className="searchArea">
                <h2>Ainete lisamine</h2>
                <hr/>
                <MainSearchBox updateQuery={this.updateQuery.bind(this)}/>
                <div className="searchButton">
                    <Button class="big-blue" name="Otsi" clickHandler={SearchArea.handleClick} />
                </div>
                <CourseSearchTable courses={this.state.courses}/>
            </div>
        )
    }
}

export default SearchArea;