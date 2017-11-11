import dispatcher from '../dispatcher/Dispatcher';
import {DraftConstants} from '../constants/DraftConstants';
import {EventEmitter} from 'events';
import axios from 'axios';

class CourseDraftStore extends EventEmitter {

    constructor() {
        super();
        this.draftedCourses = [];
        this.axoisConf = {
            baseURL: process.env.API_BASE_URL,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }

    addToDraft(coursesToAdd) {
        coursesToAdd.map((courseToRemove) => courseToRemove.course).forEach((courseToAdd) => {

            axios.create(this.axoisConf).post('drafts/' + courseToAdd.id)
                .then(() => {
                    let courses = this.draftedCourses.map((course) => course.course);
                    coursesToAdd.forEach((courseToAdd) => {
                        if (!courses.includes(courseToAdd.course)) {
                            this.draftedCourses.push(courseToAdd);
                        }
                    });
                    this.emit("change");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    removeFromDraft(coursesToRemove) {
        coursesToRemove.map((courseToRemove) => courseToRemove.course).forEach((courseToRemove) => {

            axios.create(this.axoisConf).delete('drafts/' + courseToRemove.id)
                .then(() => {
                    this.draftedCourses = this.draftedCourses.filter((el) => !coursesToRemove.includes(el));
                    this.emit("change");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    fetchDraftedCourses() {
        axios.create(this.axoisConf).get('drafts')
            .then((response) => {
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
    };

    getAll() {
        return this.draftedCourses;
    }
}

dispatcher.register((action) => {
    switch (action.type) {
        case DraftConstants.ADD_TO_DRAFT:
            courseDraftStore.addToDraft(action.courses);
            break;
        case DraftConstants.REMOVE_FROM_DRAFT:
            courseDraftStore.removeFromDraft(action.courses);
            break;
        case DraftConstants.FETCH_DRAFT:
            courseDraftStore.fetchDraftedCourses();
            break;
    }
});

const courseDraftStore = new CourseDraftStore();
export default courseDraftStore;