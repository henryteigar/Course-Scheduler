const frisby = require('frisby');



describe('subject-name-test', function() {




    it('subject-name-test', function (done) {
        frisby.get('http://course-scheduler.me:3000/api/courses?q=prog')
            .expect('json', '*',
                {
                    "id": 2,
                    "title": "Programmeerimiskeeled",
                    "credit": 6,
                    "final_assessment": "Eristav (A, B, C, D, E, F, mi)",
                    "lecturers": "Varmo Vene, Vesal Vojdani, Hiie Vill, Raul-Martin Rebane,  Simmo Saan, Mari Liis Velner, Kalmer Apinis",
                    "study_language": "eesti keel",
                    "course_code": "MTAT.03.006",
                    "cancellation_date": "12.10.2017",
                    "nr_of_registered": 154,
                    "max_registrations": 200,
                    "occurrences": "E, T, R",
                    "subject_type": "kohustuslik"
                }
            )
            .done(done);
    });
});
