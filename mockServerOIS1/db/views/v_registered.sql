CREATE OR REPLACE VIEW ois1.v_registered AS
     SELECT
          registered_courses.user_id,
          (SELECT TO_JSON(ROW_TO_JSON(obj)) FROM (SELECT * FROM ois1.v_courses
                                              WHERE ois1.v_courses.id = ois1.registered_courses.course_id) obj) AS course,
          (SELECT TO_JSON(ROW_TO_JSON(obj)) FROM (SELECT ois1.groups.id AS id, ois1.groups.name AS name FROM ois1.groups
                                              WHERE ois1.groups.id = ois1.registered_courses.group_id) obj) AS locked_group,
          (SELECT TO_JSON(ROW_TO_JSON(obj)) FROM (SELECT ois1.lecturers.id AS id, ois1.lecturers.name AS name FROM ois1.lecturers
                                              WHERE ois1.lecturers.id = ois1.registered_courses.lecturer_id) obj) AS locked_lecturer
     FROM ois1.registered_courses;