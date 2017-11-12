import axios from 'axios';

export function getAllFilters() {
    let myApi = axios.create({
        baseURL: process.env.API_BASE_URL,
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    let uri = '/default-values';

    myApi.get(uri).then((response) => {
        console.log(response.data)
    })
        .catch((error) => {
            console.log(error);
        });




    return [

        /*{ id: 'faculty', label_eng: "Faculty/Department", values: [ { id: 1, label_eng: "Faculty of Arts and Humanities" }, { id: 2, label_eng: "Faculty of Social Sciences" }, { id: 3, label_eng: "Faculty of Science and Technology" }, { id: 4, label_eng: "Office of Academic Affairs" }, { id: 5, label_eng: "Estonian Genome Center, University of Tartu" } ] }, { id: 'institute', label_eng: "Institute", values: [ { id: 1, label_eng: "Dean's Office, Faculty of Science and Technology" }, { id: 2, label_eng: "Institute of Computer Science" }, { id: 3, label_eng: "Estonian Marine Institute" }, { id: 4, label_eng: "Institute of Physics" }, { id: 5, label_eng: "Institute of Chemistry" }, { id: 6, label_eng: "Institute of Mathematics and Statistics" }, { id: 7, label_eng: "Institute of Molecular and Cell Biology" }, { id: 8, label_eng: "Institute of Technology" }, { id: 9, label_eng: "Institute of Ecology and Earth Sciences" } ] }, { id: 'level_of_study', label_eng: "Level of Study", values: [ { id: 1, label_eng: "professional higher education studies" }, { id: 2, label_eng: "bachelor's studies" }, { id: 3, label_eng: "bachelor's and master's integrated studies" }, { id: 4, label_eng: "master's studies" }, { id: 5, label_eng: "doctorial studies" } ] }, { id: 'academic_year', label_eng: "Year", values: [ { id: 1, label_eng: "2018/2019" }, { id: 2, label_eng: "2017/2018" }, { id: 3, label_eng: "2016/2017" }, { id: 4, label_eng: "2015/2017" }, { id: 5, label_eng: "2015/2016" } ] }, { id: 'semester', label_eng: "Semester", values: [ { id: 1, label_eng: "autumn" }, { id: 2, label_eng: "spring" } ] }, { id: 'schedule', label_eng: "Schedule", values: [ { id: 1, label_eng: "bak: Science & Technology, 1st year" }, { id: 2, label_eng: "bak: Science & Technology, 1nd year\"" }, { id: 3, label_eng: "informaatika 1.a" }, { id: 4, label_eng: "informaatika 2.a" }, { id: 5, label_eng: "informaatika 3.a" } ] }, { id: 'assessment', label_eng: "Assessment", values: [ { id: 1, label_eng: "differentiated (A, B, C, D, E, F, not present)" }, { id: 2, label_eng: "non-differentiated (pass, fail, not present)" }, { id: 3, label_eng: "defence" } ] }, { id: 'currently_opened', label_eng: "Registration opened", values: [ { id: 1, label_eng: "Yes" }, { id: 2, label_eng: "No" } ] }*/
    ]
}