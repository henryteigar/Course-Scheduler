module.exports = {
    getCourses: function (input_query, input_filter) {
        //SQLQuery and parameters
        let query = "SELECT * FROM v_courses WHERE 1=1";
        let parameters = [];

        if (input_query !== undefined && input_query !== '*' && input_query !== '') {
            query += " AND LOWER(course_name) LIKE $" + (parameters.length + 1);
            parameters.push('%' + input_query.toLowerCase() + '%')
        }

        if (input_filter !== undefined) {
            query += " AND subject_type LIKE $" + (parameters.length + 1);
            parameters.push('%' + input_filter + '%');
        }

        return {
            query_text: query,
            parameters: parameters
        }
    }
};