import React, { Component } from 'react';

import MainSearchBox from '../../../../components/MainSearchBox/MainSearchBox';
import CourseSearchTable from "../../../../components/CourseSearchTable/CourseSearchTable";
import Button from "../../../../components/Button/Button";

import '../../../../css/components/search-area.scss';

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [
                {
                    "id": 1,
                    "title": "Kõrgem matemaatika II",
                    "credits": 6,
                    "schedule": "E, K, N",
                    "responsibleLecturer": "Tiina Kraav",
                    "currentAttendants": 36,
                    "maxAttendants": 40,
                    "cancellationDeadline": "19.09.2017"
                },
                {
                    "id": 2,
                    "title": "Tarkvaraprojekt",
                    "credits": 6,
                    "schedule": "K, N",
                    "responsibleLecturer": "Marlon Gerardo Dumas Menjivar",
                    "currentAttendants": 73,
                    "maxAttendants": 100,
                    "cancellationDeadline": "20.09.2017"
                }
            ]
        }
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div className="searchArea">
                <h2>Ainete lisamine</h2>
                <hr />
                <MainSearchBox />
                <div className="searchButton">
                    <Button class="big-blue" name="Otsi" clickHandler={this.handleClick}/>
                </div>
                <CourseSearchTable courses={this.state.courses}/>
            </div>
        )
    }

    handleClick() {
        console.log("CLICK!!")
    }
}

export default SearchArea;