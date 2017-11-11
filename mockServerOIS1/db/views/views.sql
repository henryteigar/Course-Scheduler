CREATE OR REPLACE VIEW ois1.v_users AS
     SELECT users.id AS id,
            nr_of_study_book,
            name,
            lang,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.curriculas curricula WHERE curricula.id = users.curricula_id LIMIT 1) obj) AS curricula,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.faculties faculty WHERE faculty.id = users.faculty_id LIMIT 1) obj) AS faculty,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.institutes institute WHERE institute.id = users.institute_id LIMIT 1) obj) AS institute,
            (SELECT row_to_json(obj) FROM
                                (SELECT * FROM ois1.schedule schedule WHERE schedule.id = users.schedule_id LIMIT 1) obj) AS schedule,
            level_of_study
     FROM ois1.users users
