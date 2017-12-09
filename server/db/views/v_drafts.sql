CREATE OR REPLACE VIEW v_drafts AS
    SELECT
      draft_courses.user_id AS user_id,
      (SELECT TO_JSON(obj)
       FROM (SELECT *
             FROM ois1.v_courses
             WHERE ois1.v_courses.id =
                   draft_courses.course_id) obj) AS course,
      (SELECT TO_JSON(ARRAY_AGG(obj))
       FROM (SELECT
               groups.id   AS id,
               groups.name AS name
             FROM draft_courses_locked_groups
               JOIN ois1.groups groups ON groups.id = draft_courses_locked_groups.group_id
                                      AND draft_courses.id = draft_courses_locked_groups.draft_courses_id) obj) AS locked_groups,
      (SELECT TO_JSON(obj)
       FROM (SELECT
               ois1.groups.id   AS id,
               ois1.groups.name AS name
              FROM ois1.groups
             WHERE ois1.groups.id =
                   draft_courses.active_group_id) obj) AS active_group
    FROM draft_courses;