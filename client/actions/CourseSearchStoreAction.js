import AppDispatcher from '../dispatcher/AppDispatcher';
import { SearchConstants } from '../constants/SearchConstants';

export function getCourses(data) {
    AppDispatcher.handleViewAction({
        actionType: SearchConstants.GET_COURSES,
        data: data
    });
}