const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // TODO: Just for testing
    let body = [{ course: { "id": 4, "title": "Sissejuhatus finantsmatemaatikasse", "credit": 3, "final_assessment": "Mitteeristav (arv, m.arv, mi)", "lecturers": "Toomas Raus", "study_language": "eesti keeles", "course_code": "LTMS.00.017", "cancellation_date": "12.10.2017", "nr_of_registered": 36, "max_registrations": 50, "occurrences": "E, R", "subject_type": null }, locked_group: { Id: 1, Name: "a" }, locked_lecturer: { Id: 1, Name: "Henry" }, active_group: { Id: 2, Name: "a" }, active_lecturer: { Id: 1, Name: "Henry" } }, { course: { "id": 6, "title": "Koolieelne matemaatika", "credit": 3, "final_assessment": "Eristav (A, B, C, D, E, F, mi)", "lecturers": "Amino Põldaru", "study_language": "eesti keeles", "course_code": "P2NC.00.609", "cancellation_date": "12.10.2017", "nr_of_registered": 36, "max_registrations": 50, "occurrences": "T, N", "subject_type": null }, locked_group: { Id: 1, Name: "a" }, locked_lecturer: { Id: 1, Name: "Henry" }, active_group: { Id: 2, Name: "a" }, active_lecturer: { Id: 1, Name: "Henry" } }];

    res.status(200).send(body);
});

module.exports = router;