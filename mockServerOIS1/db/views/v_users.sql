CREATE OR REPLACE VIEW ois1.v_users AS
     SELECT users.id AS id,
            name,
            lang,
            nr_of_study_book,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.curriculas WHERE curriculas.id = users.curricula_id) obj) AS curricula,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.faculties WHERE faculties.id = users.faculty_id) obj) AS faculty,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.institutes WHERE institutes.id = users.institute_id) obj) AS institute,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.schedule WHERE schedule.id = users.schedule_id) obj) AS schedule,
            (SELECT row_to_json(obj) FROM
                                 (SELECT * FROM ois1.level_of_studies WHERE level_of_studies.id = users.level_of_study_id) obj) AS level_of_study,
            COALESCE((SELECT SUM(ois1.courses.credits) FROM ois1.courses JOIN ois1.registered_courses ON ois1.courses.id = ois1.registered_courses.course_id
                                JOIN ois1.course_curricula ON ois1.registered_courses.course_id = ois1.course_curricula.course_id
                                WHERE ois1.registered_courses.user_id = users.id AND ois1.course_curricula.curricula_id = users.curricula_id
                                AND ois1.course_curricula.course_type_id = 1), 0) AS obligatory_credits,
            COALESCE((SELECT SUM(ois1.courses.credits) FROM ois1.courses JOIN ois1.registered_courses ON ois1.courses.id = ois1.registered_courses.course_id
                                JOIN ois1.course_curricula ON ois1.registered_courses.course_id = ois1.course_curricula.course_id
                                WHERE ois1.registered_courses.user_id = users.id AND ois1.course_curricula.curricula_id = users.curricula_id
                                AND ois1.course_curricula.course_type_id = 2), 0) AS elective_credits,
            COALESCE((SELECT SUM(ois1.courses.credits) FROM ois1.courses JOIN ois1.registered_courses ON ois1.courses.id = ois1.registered_courses.course_id
                                WHERE ois1.registered_courses.user_id = users.id
                                AND NOT EXISTS(SELECT 1 FROM ois1.course_curricula WHERE ois1.course_curricula.course_id = ois1.courses.id
                                AND ois1.course_curricula.curricula_id = users.curricula_id)), 0) AS optional_credits

     FROM ois1.users users GROUP BY id