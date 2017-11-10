const frisby = require('frisby');



describe('subject-name-test', function() {




    it('subject-name-test', function (done) {
        frisby.get('http://course-scheduler.me:3000/api/courses?q=Tehis')
            .expect('json', '*',
                {
                    "id": 3,
                    "title": "Tehisintellekt",
                    "credit": 6,
                    "final_assessment": "Eristav (A, B, C, D, E, F, mi)",
                    "lecturers": "Mark Fišel, Krista Liin, Sander Tars, Sven Aller",
                    "study_language": "eesti keel",
                    "course_code": "LTAT.01.003",
                    "cancellation_date": "12.10.2017",
                    "nr_of_registered": 154,
                    "max_registrations": 200,
                    "occurrences": "K, N",
                    "subject_type": "kohustuslik;valik"
                }
            )
            .done(done);
    });
});
