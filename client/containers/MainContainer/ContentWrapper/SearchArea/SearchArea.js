import React, { Component } from 'react';
import axios from 'axios';

import courseSearchStore from '../../../../stores/CourseSearchStore'
import MainSearchBox from '../../../../components/MainSearchBox/MainSearchBox';
import CourseSearchTable from "../../../../components/CourseSearchTable/CourseSearchTable";
import Button from "../../../../components/Button/Button";

import '../../../../css/components/search-area.scss';

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            query: ''
        };
        SearchArea.handleClick = SearchArea.handleClick.bind(this);
    }

    static handleClick() {
        const myApi = axios.create({
            baseURL: 'http://localhost:3000/',
            timeout: 10000,
            withCredentials: true,
            transformRequest: [(data) => JSON.stringify(data)],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        myApi.get('api/courses')
            .then( (response) => {
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
        this.setState({courses: courseSearchStore.getCourses(this.state.query)});
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
}

export default SearchArea;