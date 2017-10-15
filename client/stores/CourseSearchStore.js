import AppDispatcher from '../dispatcher/AppDispatcher';
import { SearchConstants } from '../constants/SearchConstants';
import { EventEmitter } from 'events';

let courses = [
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
];

class CourseSearchStoreClass extends EventEmitter {
    addChangeListener(cb) {
        this.on(SearchConstants.SEARCH_COURSES, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(SearchConstants.SEARCH_COURSES, cb);
    }

    getCourses (query) {
        return courses;
    }

    setCourses (data) {
        // Todo GET Request to with query to API
        courses = [];
    }
}

const courseSearchStore = new CourseSearchStoreClass();

AppDispatcher.register((payload) => {
    const action = payload.action;

    switch (action.actionType) {
        case SearchConstants.GET_COURSES:
            console.log("GET_COURSES - STORE");
            console.log(action);
            setCourses(action.data);
            courseSearchStore.emit(SearchConstants.SEARCH_COURSES);
            break;
    }

    return true;

});

export default courseSearchStore;