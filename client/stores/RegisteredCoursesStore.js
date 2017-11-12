import dispatcher from '../dispatcher/Dispatcher';
import {RegisteredCoursesConstants} from '../constants/RegisteredCoursesConstants';
import {EventEmitter} from 'events';
import axios from 'axios';

class RegisteredCoursesStore extends EventEmitter {

    constructor() {
        super();
        this.registeredCourses = [];
        this.axoisConf = {
            baseURL: process.env.API_BASE_URL,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }

    addToRegisteredCourses(courses) {
        courses.forEach((course) => {
            if (!this.registeredCourses.includes(course)) {
                this.registeredCourses.push(course);
            }
        });
        registeredCoursesStore.emit("change");
    }

    fetchRegisteredCourses() {
        axios.create(this.axoisConf).get('registered-courses')
            .then((response) => {
                let courses = [];
                response.data.forEach((data) => {
                    courses.push({
                        "course": data.course,
                        "group": data.group
                    });
                });

                this.registeredCourses = courses;
                this.emit("change");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getAll() {
        return this.registeredCourses;
    }
}

dispatcher.register((action) => {
    switch (action.type) {
        case RegisteredCoursesConstants.ADD_TO_REGISTERED_COURSES:
            registeredCoursesStore.addToRegisteredCourses(action.courses);
            break;
        case RegisteredCoursesConstants.FETCH_REGISTERED_COURSES:
            registeredCoursesStore.fetchRegisteredCourses();
            break;
    }
});

const registeredCoursesStore = new RegisteredCoursesStore();
export default registeredCoursesStore;