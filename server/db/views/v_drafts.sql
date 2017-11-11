CREATE OR REPLACE VIEW v_drafts AS
   SELECT
        draft_courses.user_id AS user_id,
        (SELECT TO_JSON(ROW_TO_JSON(obj)) FROM (SELECT * FROM ois1.v_courses
                                            WHERE ois1.v_courses.id = draft_courses.course_id) obj) AS course,
        (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT ois1.groups.id AS id, ois1.groups.name AS name FROM ois1.groups
                                            WHERE ois1.groups.id = draft_courses.locked_group_id) obj) AS locked_group,
        (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT ois1.lecturers.id AS id, ois1.lecturers.name AS name FROM ois1.lecturers
                                            WHERE ois1.lecturers.id = draft_courses.locked_lecturer_id) obj) AS locked_lecturer,
        (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT ois1.groups.id AS id, ois1.groups.name AS name FROM ois1.groups
                                            WHERE ois1.groups.id = draft_courses.active_group_id) obj) AS active_group,
        (SELECT ARRAY_AGG(ROW_TO_JSON(obj)) FROM (SELECT ois1.lecturers.id AS id, ois1.lecturers.name AS name FROM ois1.lecturers
                                            WHERE ois1.lecturers.id = draft_courses.active_lecturer_id) obj) AS active_lecturer
   FROM draft_courses