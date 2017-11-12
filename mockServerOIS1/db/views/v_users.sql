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
                                 (SELECT * FROM ois1.level_of_studies WHERE level_of_studies.id = users.level_of_study_id) obj) AS level_of_study
     FROM ois1.users users;
