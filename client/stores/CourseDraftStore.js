import dispatcher from '../dispatcher/Dispatcher';
import {DraftConstants} from '../constants/DraftConstants';
import {EventEmitter} from 'events';
import axios from 'axios';

class CourseDraftStore extends EventEmitter {

    constructor() {
        super();
        this.draftedCourses = [];
    }

    addToDraft(coursesToAdd) {
        let courses = this.draftedCourses.map((course) => course.course);

        coursesToAdd.forEach((courseToAdd) => {
            if (!courses.includes(courseToAdd.course)) {
                this.draftedCourses.push({course: courseToAdd});
            }
        });
    }

    removeFromDraft(coursesToRemove) {
        this.draftedCourses = this.draftedCourses.filter((el) => !coursesToRemove.includes(el));
    }

    getAll() {
        return this.draftedCourses;
    }

    fetchCourses() {
        let myApi = axios.create({
            baseURL: process.env.API_BASE_URL,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let uri = 'drafts';

        myApi.get(uri).then((response) => {
            let courses = [];
            response.data.forEach((data) => {
                courses.push({
                    "course": data.course,
                    "locked_group": data.locked_group,
                    "locked_lecturer": data.locked_lecturer,
                    "active_group": data.active_group,
                    "active_lecturer": data.active_lecturer
                });
            });

            this.draftedCourses = courses;
            this.emit("change");
        })
            .catch((error) => {
                console.log(error);
            });

        this.emit("change");
    };
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