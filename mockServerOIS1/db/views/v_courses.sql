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
            courses.assessment AS assessment,
            courses.limit_of_attendants AS limit_of_attendants,
            courses.registered_attendants AS registered_attendants,
            (SELECT ARRAY_AGG(ROW_TO_JSON(obj1)) FROM (SELECT occurence.type AS type,
                              (SELECT ROW_TO_JSON(obj) FROM (SELECT times.id AS id,
                                                                    times.week AS week,
                                                                    times.day AS day,
                                                                    times.start_time AS start_time,
                                                                    times.end_time AS end_time,
                                                                    to_char(times.start_time, 'HH')::int AS start_hour,
                                                                    to_char(times.start_time, 'MM')::int AS start_minute,
                                                                    to_char(times.end_time, 'HH')::int AS end_hour,
                                                                    to_char(times.end_time, 'MM')::int AS end_minute
                                                               FROM ois1.occurrence_time times WHERE
                                                                        times.id = occurence.time_id) obj) AS time,
                              occurence.schedule_id AS schedule,
                              occurence.remarks AS remarks,
                              occurence.place AS place,
                              (SELECT  ROW_TO_JSON(obj) FROM (SELECT groups.id AS id, groups.name AS name FROM ois1.groups groups
                                                              WHERE occurence.group_id = groups.id) obj) AS group,
                              occurence.limit_of_attendants AS limit_of_attendants,
                              occurence.registered_attendants AS registered_attendants,
                              (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT lecturer.id AS id, lecturer.name AS name FROM ois1.lecturers lecturer, ois1.occurrence_lecturer o_lecturer
                                                                WHERE lecturer.id = o_lecturer.lecturer_id AND occurence.id = o_lecturer.occurrence_id) obj) AS lecturers

                       FROM ois1.occurrences occurence
                       JOIN ois1.course_occurrences cooc ON cooc.occurrence_id = occurence.id AND cooc.course_id = courses.id) obj1) AS occurrences
     FROM ois1.courses courses;