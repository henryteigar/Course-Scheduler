const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // TODO: Just for testing
    let body = [{ course: { "id": 4, "course_name": "Sissejuhatus finantsmatemaatikasse", "credits": 3, "final_assessment": "Mitteeristav (arv, m.arv, mi)", "lecturer": "Toomas Raus", "study_language": "eesti keeles", "course_code": "LTMS.00.017", "cancellation_date": "12.10.2017", "reg_persons": 36, "max_registrations": 50, "schedule": "E, R", "subject_type": null }, locked_group: { id: 1, name: "a" }, locked_lecturer: { id: 1, name: "Henry" }, active_group: { id: 2, name: "7. rühm" }, active_lecturer: { id: 1, name: "Henry" } }, { course: { "id": 6, "course_name": "Koolieelne matemaatika", "credits": 3, "final_assessment": "Eristav (A, B, C, D, E, F, mi)", "lecturer": "Amino Põldaru", "study_language": "eesti keeles", "course_code": "P2NC.00.609", "cancellation_date": "12.10.2017", "reg_persons": 36, "max_registrations": 50, "schedule": "T, N", "subject_type": null }, locked_group: { id: 1, name: "a" }, locked_lecturer: { id: 1, name: "Henry" }, active_group: { id: 3, name: "17. rühm" }, active_lecturer: { id: 1, name: "Janar" } }];
    res.status(200).send(body);
});

module.exports = router;