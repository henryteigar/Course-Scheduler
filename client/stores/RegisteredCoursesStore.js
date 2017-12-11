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
        };
    };

    addToRegisteredCourses(coursesToAdd) {
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
        coursesToAdd.forEach((courseToAdd) => {
            axios.create(this.axoisConf)
                .post('registered-courses',
                    {
                        'course_id': courseToAdd.course.id,
                        'group_id': courseToAdd.locked_group !== null ? courseToAdd.locked_group.id : null
                    }
                )
                .then(() => {
                    this.fetchRegisteredCourses();
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

    removeFromRegisteredCourses(courseToRemove) {
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
        axios.create(this.axoisConf)
            .delete('registered-courses/' + courseToRemove.id)
            .then(() => {
                this.fetchRegisteredCourses();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    fetchRegisteredCourses() {
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
        axios.create(this.axoisConf).get('registered-courses')
            .then((response) => {
                this.registeredCourses = response.data;
                this.emit("change");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    hasGroupSystem(registeredCourse) {
        if (registeredCourse.course.occurrences === null) {
            return false;
        }
        let hasGroups = false;
        registeredCourse.course.occurrences.forEach((occurrence) => {
            if (occurrence.group !== null) {
                hasGroups = true;
            }
        });
        return hasGroups;
    }

    getRelevantOccurrences(registeredCourse) {
        let course = registeredCourse.course;
        let groupId = registeredCourse.locked_group.id;
        let specificOccurrences = [];

        course.occurrences.forEach((occurrence) => {
           if (occurrence.group === null || occurrence.group.id === groupId) {
               specificOccurrences.push(occurrence);
           }
        });

        return specificOccurrences;
    }

    getAll() {
        this.registeredCourses.forEach((registeredCourse) => {
            let hasGroups = this.hasGroupSystem(registeredCourse);
            registeredCourse.has_group_system = hasGroups;

            if (hasGroups && registeredCourse.locked_group !== null) {
                registeredCourse.locked_group.occurrences = this.getRelevantOccurrences(registeredCourse)
            }
        });

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
        case RegisteredCoursesConstants.REMOVE_FROM_REGISTERED_COURSES:
            registeredCoursesStore.removeFromRegisteredCourses(action.course);
            break;
    }
});

const registeredCoursesStore = new RegisteredCoursesStore();
export default registeredCoursesStore;