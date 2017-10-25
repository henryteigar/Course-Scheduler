import dispatcher from '../dispatcher/Dispatcher';
import { SearchConstants } from '../constants/SearchConstants';

export function searchCourses(query) {
    dispatcher.dispatch({
        type: SearchConstants.SEARCH_COURSES,
        query: query
    });
}

export function clearResults() {
    dispatcher.dispatch({
        type: SearchConstants.CLEAR_RESULTS
    });
}

export function changeCoursesSearchFilter(filter) {
    dispatcher.dispatch({
        type: SearchConstants.CHANGE_SEARCH_FILTER,
        filter: filter
    });
}