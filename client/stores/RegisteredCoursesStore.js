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
        console.log(coursesToAdd);

        coursesToAdd.forEach((courseToAdd) => {
            axios.create(this.axoisConf)
                .post('registered-courses',
                    {
                        'course_id': courseToAdd.course.id,
                        'group_id': courseToAdd.groupId
                    }
                )
                .then(() => {
                    // let courses = this.registeredCourses.map((course) => course.course);
                    // coursesToAdd.forEach((course) => {
                    //     if (!courses.includes(course)) {
                    //         this.registeredCourses.push(course);
                    //     }
                    // });
                    this.emit("change");
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

    removeFromRegisteredCourses(courseToRemove) {
        axios.create(this.axoisConf)
            .delete('registered-courses/' + courseToRemove.id)
            .then(() => {
                this.registeredCourses = this.registeredCourses.filter((el) => el.course !== courseToRemove);
                this.emit("change");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    fetchRegisteredCourses() {
        axios.create(this.axoisConf).get('registered-courses')
            .then((response) => {
                this.registeredCourses = response.data;
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
        case RegisteredCoursesConstants.REMOVE_FROM_REGISTERED_COURSES:
            registeredCoursesStore.removeFromRegisteredCourses(action.course);
            break;
    }
});

const registeredCoursesStore = new RegisteredCoursesStore();
export default registeredCoursesStore;