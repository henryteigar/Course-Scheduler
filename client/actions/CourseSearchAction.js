import dispatcher from '../dispatcher/Dispatcher';
import { SearchConstants } from '../constants/SearchConstants';

export function searchCourses(query) {
    dispatcher.dispatch({
        type: SearchConstants.SEARCH_COURSES,
        query: query
    });
}