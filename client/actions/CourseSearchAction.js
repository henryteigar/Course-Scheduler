import dispatcher from '../dispatcher/Dispatcher';
import { SearchConstants } from '../constants/SearchConstants';

export function searchCourses(query, filter) {
    dispatcher.dispatch({
        type: SearchConstants.SEARCH_COURSES,
        query: query,
        filter: filter
    });
}

export function clearSearchResult() {
    dispatcher.dispatch({
        type: SearchConstants.CLEAR_SEARCH_RESULTS
    });
}

export function changeCoursesDetailedSearchFilters(filters) {
    dispatcher.dispatch({
        type: SearchConstants.CHANGE_DETAILED_SEARCH_FILTERS,
        filters: filters
    });
}