module.exports = {
    getCourses: function (input_query, input_faculty, input_institute, input_year, input_semester,
                          input_schedule, input_levelOfStudy, input_assessment, input_currentlyOpened, input_ids) {
        //SQLQuery and parameters
        let query = "SELECT * FROM ois1.v_courses WHERE 1=1";
        let parameters = [];

        if (input_query !== undefined && input_query !== '*' && input_query !== '') {
            query += " AND LOWER(name_est) LIKE $" + (parameters.length + 1);
            parameters.push('%' + input_query.toLowerCase() + '%')
        }

        if (input_faculty !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM course_faculty cofa WHERE cofa.course_id = id AND cofa.id = $" + (parameters.length + 1) + ")";
            parameters.push('%' + input_faculty + '%');
        }

        if (input_institute !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM course_institute coin WHERE coin.course_id = id AND coin.id = $" + (parameters.length + 1) + ")";
            parameters.push('%' + input_institute + '%');
        }

        if (input_year !== undefined) {
            query += " AND year = $" + (parameters.length + 1);
            parameters.push('%' + input_year + '%');
        }

        if (input_semester !== undefined) {
            query += " AND semester = $" + (parameters.length + 1);
            parameters.push('%' + input_semester + '%');
        }

        if (input_schedule !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM course_schedule cosc WHERE cosc.course_id = id AND cosc.id = $" + (parameters.length + 1) + ")";
            parameters.push('%' + input_schedule + '%');
        }

        if (input_levelOfStudy !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM course_level_of_study cole WHERE cole.course_id = id AND cole.id = $" + (parameters.length + 1) + ")";
            parameters.push('%' + input_levelOfStudy + '%');
        }

        if (input_assessment !== undefined) {
            query += " AND assessment = $" + (parameters.length + 1);
            parameters.push('%' + input_assessment + '%');
        }

        if (input_currentlyOpened !== undefined) {
            query += " AND currently_opened = $" + (parameters.length + 1);
            parameters.push('%' + input_currentlyOpened + '%');
        }

        if (input_ids !== undefined) {
            let listOfIds = input_ids.split(",");
            query += " AND (";
            for (let i = 0; i < listOfIds.length; i++) {
                query += " OR id = $" + (parameters.length + 1);
                parameters.push('%' + listOfIds[i] + '%');
            }
            query += " )";
        }

        return {
            query_text: query,
            parameters: parameters
        };
    }
};