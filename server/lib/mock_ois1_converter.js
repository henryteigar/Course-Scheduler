function processCourse(course) {
    course.reg_persons_info = course.registered_attendants + "/" + course.limit_of_attendants;
    course.cancellation_date = course.cancellation_date.slice(0, 10).split("-").reverse().join('.');
    course.responsible_lecturer_name = (course.lecturers && course.lecturers.responsible) ? course.lecturers.responsible[0].name : null;
    course.occurrence_days_est = getOccurrenceDays(course.occurrences, 'est');
    course.occurrence_days_eng = getOccurrenceDays(course.occurrences, 'eng');
    return course
}

function getOccurrenceDays(occurrences, lang) {
    if (occurrences === null) {
        return ""
    }
    let eng_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let est_days = ['E', 'T', 'K', 'N', 'R', 'L', 'P'];
    let day_nrs = ['1', '2', '3', '4', '5', '6', '7'];

    let days = lang === 'est' ? est_days : eng_days;
    return occurrences.map((occ) => {
       return occ.time.day;
    }).join().split(",").filter((item, pos, self) => {
        return self.indexOf(item) === pos
    }).sort().map((el) => {
        return days[day_nrs.indexOf(el)]
    }).join(", ");
}

module.exports.processCourse = processCourse;