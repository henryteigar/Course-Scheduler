CREATE OR REPLACE VIEW ois1.v_default_values AS
  SELECT to_json(row_to_json((obj))) FROM (SELECT
     (SELECT json_agg(row_to_json((obj))) FROM  (SELECT * FROM ois1.faculties) obj) as faculties,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.institutes) obj) as institutes,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.level_of_studies) obj) as level_of_studies,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.academic_year) obj) as academic_year,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.semesters) obj) as semesters,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.schedule) obj) as schedule,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.assessments) obj) as assessments,
     (SELECT json_agg(row_to_json((obj))) FROM (SELECT * FROM ois1.currently_opened) obj) as currently_opened) obj;