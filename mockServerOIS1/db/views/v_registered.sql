CREATE OR REPLACE VIEW ois1.v_registered AS
   SELECT
        registered_courses.user_id AS user_id,
        (SELECT TO_JSON(ROW_TO_JSON(obj)) FROM (SELECT * FROM ois1.v_courses
                                            WHERE ois1.v_courses.id = registered_courses.course_id) obj) AS course,
        (SELECT TO_JSON(ROW_TO_JSON(obj)) FROM (SELECT ois1.groups.id AS id, ois1.groups.name AS name FROM ois1.groups
                                            WHERE ois1.groups.id = registered_courses.group_id) obj) AS group
   FROM ois1.registered_courses