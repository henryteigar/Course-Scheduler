import AppDispatcher from '../dispatcher/AppDispatcher';
import { SearchConstants } from '../constants/SearchConstants';

export function loadCourses(data) {
    AppDispatcher.handleViewAction({
        actionType: SearchConstants.LOAD_COURSES,
        data: data
    });
}