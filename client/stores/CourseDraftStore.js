import dispatcher from '../dispatcher/Dispatcher';
import {DraftConstants} from '../constants/DraftConstants';
import {EventEmitter} from 'events';

class CourseDraftStore extends EventEmitter {

    constructor() {
        super();
        this.draftedCourses = [];
    }

    addToDraft(courses) {
        courses.forEach((course) => {
            if (!this.draftedCourses.includes(course)) {
                this.draftedCourses.push(course);
            }
        });
    }

    removeFromDraft(courses) {
        this.draftedCourses = this.draftedCourses.filter((el) => !courses.includes(el));
    }

    getAll() {
        return this.draftedCourses;
    }
}

dispatcher.register((action) => {
    switch (action.type) {
        case DraftConstants.ADD_TO_DRAFT:
            courseDraftStore.addToDraft(action.courses);
            courseDraftStore.emit("change");
            break;
        case DraftConstants.REMOVE_FROM_DRAFT:
            courseDraftStore.removeFromDraft(action.courses);
            courseDraftStore.emit("change");
            break;
    }
});

const courseDraftStore = new CourseDraftStore();
export default courseDraftStore;