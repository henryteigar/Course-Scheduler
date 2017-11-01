module.exports = {
    getCourses: function (input_query, input_filter) {
        //SQLQuery and parameters
        let query = "SELECT *, TO_CHAR(cancellation_date, 'DD.MM.YYYY') AS cancellation_date FROM subjects WHERE 1=1";
        let parameters = [];

        if (input_query !== undefined && input_query !== '*' && input_query !== '') {
            query += " AND LOWER(title) LIKE $" + (parameters.length + 1);
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