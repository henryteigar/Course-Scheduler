import React from 'react';

import CourseSearchRow from './CourseSearchRow';

import 'client/components/CourseSearchTable/course-search-table.scss'

const CourseSearchTable = (props) => {
    let rows = [];
    props.courses.forEach((row) => {
        rows.push(<CourseSearchRow key={row.id} rowData={row}/>)
    });
    if (rows.length === 0) return null;

    return (
        <table className="courseSearchTable">
            <thead>
                <tr>
                    <th></th>
                    <th>Course name</th>
                    <th>Credits</th>
                    <th>Schedule</th>
                    <th>Lecturer</th>
                    <th>Reg. persons</th>
                    <th>Cancellation date</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default CourseSearchTable;