import dispatcher from '../dispatcher/Dispatcher';
import {DraftConstants, SearchConstants} from '../constants/DraftConstants';
import {EventEmitter} from 'events';

class CourseDraftStore extends EventEmitter {
    constructor() {
        super();
        this.draftedCourses = [];
    }

    addToDraft(courses) {
        this.draftedCourses = courses;
        this.emit("change");
    }

    getAll() {
        return this.draftedCourses;
    }
}

dispatcher.register((action) => {
    switch (action.type) {
        case DraftConstants.ADD_TO_DRAFT:
            courseDraftStore.addToDraft(action.courses);
            break;
    }
});


const courseDraftStore = new CourseDraftStore();
export default courseDraftStore;