CREATE OR REPLACE VIEW ois1.v_courses AS
  SELECT courses.id AS id,
            courses.name_est AS name_est,
            courses.name_eng AS name_eng,
            courses.credits AS credits,
            (JSON_BUILD_OBJECT('responsible', (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT lecturer.id AS id, lecturer.name AS name FROM ois1.lecturers lecturer, ois1.course_lecturer c_lecturer
                                              WHERE lecturer.id = c_lecturer.lecturer_id AND courses.id = c_lecturer.course_id AND c_lecturer.responsible = TRUE) obj),
                                'other', (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT lecturer.id AS id, lecturer.name AS name FROM ois1.lecturers lecturer, ois1.course_lecturer c_lecturer
                                              WHERE lecturer.id = c_lecturer.lecturer_id AND courses.id = c_lecturer.course_id) obj))) AS lecturers,
            courses.cancellation_date AS cancellation_date,
            courses.objective_est AS objectives_est,
            courses.objective_eng AS objectives_eng,
            courses.outcome_est AS outcomes_est,
            courses.outcome_eng AS outcomes_eng,
            courses.description_est AS descriptions_est,
            courses.description_est AS descriptions_eng,
            (SELECT row_to_json(obj) FROM
                                (SELECT
                                    ois1.assessments.id AS id,
                                    ois1.assessments.name_eng AS assessment_name_eng,
                                    ois1.assessments.name_est AS assessment_name_est
                                FROM ois1.assessments
                                WHERE courses.assessment_id = ois1.assessments.id) obj) AS assessment,
            courses.limit_of_attendants AS limit_of_attendants,
            courses.registered_attendants AS registered_attendants,
            (SELECT JSON_AGG(row_to_json(obj)) FROM
                                (SELECT
                                    course_type_id AS id,
                                    course_type.name_eng AS course_type_name_eng,
                                    course_type.name_est AS course_type_name_est,
                                    curriculas.name_est AS curricula_name_est,
                                    curriculas.name_eng AS curricula_name_eng
                                 FROM ois1.course_curricula JOIN ois1.course_type ON course_curricula.course_type_id = course_type.id
                                   JOIN ois1.curriculas ON course_curricula.curricula_id = curriculas.id
                                  WHERE courses.id = course_curricula.course_id) obj) AS curricula,
            (SELECT JSON_AGG(ROW_TO_JSON(obj1)) FROM (SELECT occurrence.type AS type,
                              (SELECT JSON_AGG(ROW_TO_JSON(obj)) FROM (SELECT times.id AS id,
                                                                    times.week AS week,
                                                                    times.day AS day,
                                                                    times.start_time AS start_time,
                                                                    times.end_time AS end_time,
                                                                    to_char(times.start_time, 'HH24')::int AS start_hour,
                                                                    to_char(times.start_time, 'MI')::int AS start_minute,
                                                                    to_char(times.end_time, 'HH24')::int AS end_hour,
                                                                    to_char(times.end_time, 'MI')::int AS end_minute
                                                               FROM ois1.occurrence_time times WHERE times.occurrence_id = occurrence.id) obj) AS time,
                              occurrence.schedule_id AS schedule,
                              occurrence.remarks AS remarks,
                              occurrence.place AS place,
                              (SELECT  ROW_TO_JSON(obj) FROM (SELECT groups.id AS id, groups.name AS name FROM ois1.groups groups
                                                              WHERE occurrence.group_id = groups.id) obj) AS group,
                              occurrence.limit_of_attendants AS limit_of_attendants,
                              occurrence.registered_attendants AS registered_attendants,
                              (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT lecturer.id AS id, lecturer.name AS name FROM ois1.lecturers lecturer, ois1.occurrence_lecturer o_lecturer
                                                                WHERE lecturer.id = o_lecturer.lecturer_id AND occurrence.id = o_lecturer.occurrence_id) obj) AS lecturers
                       FROM ois1.occurrences occurrence
                       JOIN ois1.course_occurrences cooc ON cooc.occurrence_id = occurrence.id AND cooc.course_id = courses.id) obj1) AS occurrences
     FROM ois1.courses courses WHERE courses.registration_open = TRUE ;