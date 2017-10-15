import React, { Component } from 'react';

import { getCourses } from '../../../../actions/CourseSearchStoreAction'
import CourseSearchStore from '../../../../stores/CourseSearchStore'
import MainSearchBox from '../../../../components/MainSearchBox/MainSearchBox';
import CourseSearchTable from "../../../../components/CourseSearchTable/CourseSearchTable";
import Button from "../../../../components/Button/Button";

import '../../../../css/components/search-area.scss';

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
        SearchArea.handleClick = SearchArea.handleClick.bind(this);
    }
    render() {
        return (
            <div className="searchArea">
                <h2>Ainete lisamine</h2>
                <hr />
                <MainSearchBox />
                <div className="searchButton">
                    <Button class="big-blue" name="Otsi" clickHandler={SearchArea.handleClick}/>
                </div>
                <CourseSearchTable courses={this.state.courses}/>
            </div>
        )
    }

    static handleClick() {
        this.setState({courses: CourseSearchStore.getCourses()});
    }
}

export default SearchArea;