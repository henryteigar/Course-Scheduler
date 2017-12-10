import dispatcher from '../dispatcher/Dispatcher';
import {DraftConstants} from '../constants/DraftConstants';

export function addToDraft(courses) {
    dispatcher.dispatch({
        type: DraftConstants.ADD_TO_DRAFT,
        courses: courses
    });
}

export function removeFromDraft(courses) {
    dispatcher.dispatch({
        type: DraftConstants.REMOVE_FROM_DRAFT,
        courses: courses
    });
}

export function fetchDraftedCourses() {
    dispatcher.dispatch({
        type: DraftConstants.FETCH_DRAFT,
    });
}

export function setLockedGroups(courseId, groups) {
    dispatcher.dispatch({
        type: DraftConstants.SET_LOCKED_GROUPS,
        courseId,
        groups
    });
}