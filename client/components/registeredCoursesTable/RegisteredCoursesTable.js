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
                    <td>{row.title}</td>
                    <td>{row.credits}</td>
                    <td>{row.responsibleLecturer} EAP</td>
                    <td>{row.cancellationDeadline}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default RegisteredCoursesTable;