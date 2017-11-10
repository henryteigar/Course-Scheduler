import dispatcher from '../dispatcher/Dispatcher';
import {RegisteredCoursesConstants} from '../constants/RegisteredCoursesConstants';
import {EventEmitter} from 'events';

class RegisteredCoursesStore extends EventEmitter {

    constructor() {
        super();
        this.registeredCourses = [];
    }

    getAll() {
        return this.registeredCourses;
    }

    addToRegisteredCourses(courses) {
        // TODO
        console.log("addToRegisteredCourses")
    }
}

dispatcher.register((action) => {
    switch (action.type) {
        case RegisteredCoursesConstants.ADD_TO_REGISTERED_COURSES:
            registeredCoursesStore.addToRegisteredCourses(action.courses);
            break;
    }
});

const registeredCoursesStore = new RegisteredCoursesStore();
export default registeredCoursesStore;