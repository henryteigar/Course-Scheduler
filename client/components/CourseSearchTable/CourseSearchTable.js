import React from 'react';

import CourseSearchRow from './CourseSearchRow';

import '../../css/components/course-search-table.scss'

const CourseSearchTable = (props) => {
    let rows = [];
    props.courses.forEach((row) => {
        rows.push(<CourseSearchRow key={row.id} rowData={row}/>)
    });
    return (
        <table className="courseSearchTable">
            <thead>
                <tr>
                    <th></th>
                    <th>Aine nimi</th>
                    <th>Maht</th>
                    <th>Toimumised</th>
                    <th>Õppejõud</th>
                    <th>Reg. isikud</th>
                    <th>Tühistamise kp</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default CourseSearchTable;