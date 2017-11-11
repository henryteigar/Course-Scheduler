import React from 'react';

const RegisteredCoursesTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Course name</th>
                <th>Credits</th>
                <th>Lecturer</th>
                <th>Cancellation date</th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map((row) =>
                <tr key={row.id}>
                    <td>{row.name_eng}</td>
                    <td>{row.credits}</td>
                    <td>{row.lecturer}</td>
                    <td>{row.cancellation_date}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default RegisteredCoursesTable;