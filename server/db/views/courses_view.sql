CREATE OR REPLACE VIEW v_courses AS
    SELECT title AS course_name,
           CONCAT(credit, ' ', 'EAP') AS credits,
           occurrences AS schedule,
           SPLIT_PART(lecturers, ',', 1) AS lecturer,
           CONCAT(nr_of_registered, '/', max_registrations) AS reg_persons,
           TO_CHAR(cancellation_date, 'DD.MM.YYYY') AS cancellation_date,
           subject_type
    FROM subjects