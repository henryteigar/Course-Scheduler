import dispatcher from '../dispatcher/Dispatcher';
import {RegisteredCoursesConstants} from '../constants/RegisteredCoursesConstants';

export function addToRegisteredCourses(courses) {
    dispatcher.dispatch({
        type: RegisteredCoursesConstants.ADD_TO_REGISTERED_COURSES,
        courses: courses
    });
}