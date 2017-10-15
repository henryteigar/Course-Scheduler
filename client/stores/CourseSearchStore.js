import AppDispatcher from '../dispatcher/AppDispatcher';
import { SearchConstants } from '../constants/SearchConstants';
import { EventEmitter } from 'events';

let courseSearch = {
    courses: [
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
    ]
};

class CourseSearchStoreClass extends EventEmitter {
    addChangeListener(cb) {
        this.on(SearchConstants.SEARCH_COURSES, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(SearchConstants.SEARCH_COURSES, cb);
    }

    getCourses() {
        return courseSearch.courses;
    }

    setCourses(data) {
        courseSearch.courses = data.courses;
    }
}

const courseSearchStore = new CourseSearchStoreClass();

AppDispatcher.register((payload) => {
    const action = payload.action;

    switch (action.actionType) {
        case SearchConstants.LOAD_COURSES:
            this.setCourses(action.data);
            this.emit(SearchConstants.SEARCH_COURSES);
            break;
    }

    return true;

});

export default courseSearchStore;