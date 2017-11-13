module.exports = {
    getCourses: function (input_query, input_lang, input_faculty, input_institute, input_year, input_semester,
                          input_schedule, input_levelOfStudy, input_assessment, input_currentlyOpened, input_ids) {
        //SQLQuery and parameters
        let query = "SELECT * FROM ois1.v_courses WHERE 1=1";
        let parameters = [];

        if (input_query !== undefined && input_query !== '*' && input_query !== '') {
            let field = 'name_eng';
            if (input_lang && input_lang.toLowerCase() === 'est') {
                field = 'name_est';
            }

            query += " AND LOWER(" + field  + ") LIKE $" + (parameters.length + 1);
            parameters.push('%' + input_query.toLowerCase() + '%')
        }

        if (input_faculty !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_faculty cofa WHERE cofa.course_id = ois1.v_courses.id AND cofa.faculty_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_faculty);
        }

        if (input_institute !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_institute coin WHERE coin.course_id = ois1.v_courses.id AND coin.institute_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_institute);
        }

        if (input_year !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_academic_year coac WHERE coac.course_id = ois1.v_courses.id AND coac.academic_year_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_year);
        }

        if (input_semester !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_semester cose WHERE cose.course_id = ois1.v_courses.id AND cose.semester_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_semester);
        }

        if (input_schedule !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_schedule cosc WHERE cosc.course_id = ois1.v_courses.id AND cosc.schedule_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_schedule);
        }

        if (input_levelOfStudy !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_level_of_study cole WHERE cole.course_id = ois1.v_courses.id AND cole.level_of_study_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_levelOfStudy);
        }

        if (input_assessment !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_assessment coas WHERE coas.course_id = ois1.v_courses.id AND coas.assessment_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_assessment);
        }

        if (input_currentlyOpened !== undefined) {
            query += " AND EXISTS (SELECT 1 FROM ois1.course_currently_opened cocu WHERE cocu.course_id = ois1.v_courses.id AND cocu.currently_opened_id = $" + (parameters.length + 1) + ")";
            parameters.push(input_currentlyOpened);
        }

        if (input_ids !== undefined) {
            let listOfIds = input_ids.split(",");
            query += " AND (";
            for (let i = 0; i < listOfIds.length; i++) {
                query += " OR ois1.v_courses.id = $" + (parameters.length + 1);
                parameters.push(listOfIds[i]);
            }
            query += " )";
        }

        return {
            query_text: query,
            parameters: parameters
        };
    }
};