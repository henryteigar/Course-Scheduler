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