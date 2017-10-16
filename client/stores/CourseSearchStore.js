import dispatcher from '../dispatcher/Dispatcher';
import {SearchConstants} from '../constants/SearchConstants';
import {EventEmitter} from 'events';
import axios from 'axios';


class CourseSearchStore extends EventEmitter {
    constructor() {
        super();
        this.courses = [];
    }

    getAll() {
        return this.courses;
    }

    fetchCourses(query) {
        const myApi = axios.create({
            baseURL: 'http://course-scheduler.me:3000/', //TODO teha config fail
            timeout: 10000,
            withCredentials: true,
            transformRequest: [(data) => JSON.stringify(data)],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        myApi.get('api/courses?q=' + query).then((response) => {
            let courses = [];
            response.data.forEach((data) => {
                let course = {
                    "id": data.id,
                    "title": data.title,
                    "credits": data.credit,
                    "schedule": data.occurrences,
                    "responsibleLecturer": data.lecturers.split(", ")[0],
                    "currentAttendants": data.nr_of_registered,
                    "maxAttendants": data.max_registrations,
                    "cancellationDeadline": "19.09.2017"
                };
                courses.push(course);
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
    }
});

const courseSearchStore = new CourseSearchStore();
export default courseSearchStore;