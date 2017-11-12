import dispatcher from '../dispatcher/Dispatcher';
import {RegisteredCoursesConstants} from '../constants/RegisteredCoursesConstants';

export function addToRegisteredCourses(courses) {
    dispatcher.dispatch({
        type: RegisteredCoursesConstants.ADD_TO_REGISTERED_COURSES,
        courses: courses
    });
};

export function fetchRegisteredCourses(courses) {
    dispatcher.dispatch({
        type: RegisteredCoursesConstants.FETCH_REGISTERED_COURSES,
        courses: courses
    });
};

export function removeFromDraft(course) {
    dispatcher.dispatch({
        type: RegisteredCoursesConstants.REMOVE_FROM_REGISTERED_COURSES,
        course: course
    });
}