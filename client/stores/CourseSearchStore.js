import dispatcher from '../dispatcher/Dispatcher';
import {SearchConstants} from '../constants/SearchConstants';
import {EventEmitter} from 'events';
import axios from 'axios';

class CourseSearchStore extends EventEmitter {
    constructor() {
        super();
        this.courses = [];
        this.filter = null;
        this.detailedFilters = [];
    }

    getAll() {
        return this.courses;
    }

    clearAll() {
        this.courses = [];
        this.emit("change");
    }

    setFilter(filter) {
        this.filter = filter;
        this.emit("change");
    }

    setDetailedFilters(filters) {
        this.detailedFilters = filters;
        this.emit("change")
    }

    fetchCourses(query) {
        let myApi = axios.create({
            baseURL: process.env.API_BASE_URL,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let uri = 'courses?q=' + query;
        if (this.filter && this.filter !== "all") uri += '&filter=' + this.filter;
        this.detailedFilters.forEach((filter) => {
            if (filter.selectedEl !== null) {
                uri += '&' + filter.id + '=' + filter.selectedEl.id
            }
        });

        console.log(uri);

        myApi.get(uri).then((response) => {
            let courses = [];
            response.data.forEach((data) => {
                courses.push(data);
            });

            this.courses = courses;
            this.emit("change");
        })
            .catch((error) => {
                console.log(error);
            });

        this.emit("change");
    };

}

dispatcher.register((action) => {
    switch (action.type) {
        case SearchConstants.SEARCH_COURSES:
            courseSearchStore.fetchCourses(action.query);
            break;
        case SearchConstants.CHANGE_SEARCH_FILTER:
            courseSearchStore.setFilter(action.filter);
            break;
        case SearchConstants.CHANGE_DETAILED_SEARCH_FILTERS:
            courseSearchStore.setDetailedFilters(action.filters);
            break;
        case SearchConstants.CLEAR_SEARCH_RESULTS:
            courseSearchStore.clearAll();
            break;
    }
});

const courseSearchStore = new CourseSearchStore();
export default courseSearchStore;