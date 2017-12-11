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
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
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
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
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
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
        axios.create(this.axoisConf).get('drafts')
            .then((response) => {
                this.draftedCourses = response.data;
                this.emit("change");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    hasGroupSystem(draftCourse) {
        let hasGroups = false;
        if (draftCourse.course.occurrences === null) {
            return false;
        }
        draftCourse.course.occurrences.forEach((occurrence) => {
            if (occurrence.group !== null) {
                hasGroups = true;
            }
        });
        return hasGroups;
    }

    getRelevantOccurrences(draftCourse) {
        let course = draftCourse.course;
        let groupId = draftCourse.active_group.id;
        let specificOccurrences = [];

        course.occurrences.forEach((occurrence) => {
            if (occurrence.group === null || occurrence.group.id === groupId) {
                specificOccurrences.push(occurrence);
            }
        });

        return specificOccurrences;
    }

    getAll() {
        this.draftedCourses.forEach((draftCourse) => {
            let hasGroups = this.hasGroupSystem(draftCourse);
            draftCourse.has_group_system = hasGroups;

            if (hasGroups && draftCourse.active_group !== null) {
                draftCourse.active_group.occurrences = this.getRelevantOccurrences(draftCourse)
            }
        });
        return this.draftedCourses;
    }

    setLockedGroups(courseId, groupsIds) {
        let groups = groupsIds.map((groupId) => { return {id: groupId} });
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
        axios.create(this.axoisConf)
            .put('drafts/', {
                course_id: courseId,
                locked_groups: groups.length === 0 ? null : groups,
                active_group_id: null
            })
            .then(() => {
                this.fetchDraftedCourses();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateDraftCourse(courseId, lockedGroups, activeGroup) {
        this.axoisConf.headers['x-access-token'] = localStorage.getItem('token');
        axios.create(this.axoisConf).put('drafts/', {course_id: courseId, locked_groups: lockedGroups, active_group_id: activeGroup.id})
            .then(() => {
                this.fetchDraftedCourses();
            })
            .catch((error) => {
                console.log(error);
            });
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
        case DraftConstants.SET_LOCKED_GROUPS:
            courseDraftStore.setLockedGroups(action.courseId, action.groups);
            break;
        case DraftConstants.UPDATE_DRAFT_COURSE:
            courseDraftStore.updateDraftCourse(action.courseId, action.lockedGroups, action.activeGroup);
            break;
    }
});

const courseDraftStore = new CourseDraftStore();
export default courseDraftStore;