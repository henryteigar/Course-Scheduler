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
        coursesToAdd.map((courseToAdd) => courseToAdd.course).forEach((courseToAdd) => {

            axios.create(this.axoisConf).post('drafts/' + courseToAdd.id)
                .then(() => {
                    this.fetchDraftedCourses();
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
                    this.fetchDraftedCourses();
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    fetchDraftedCourses() {
        axios.create(this.axoisConf).get('drafts')
            .then((response) => {
                this.draftedCourses = response.data;
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