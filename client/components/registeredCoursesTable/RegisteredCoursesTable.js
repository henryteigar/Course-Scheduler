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
<<<<<<< HEAD
            {props.courses.map((course) =>
                <tr key={course.id}>
                    <td>{course.courseName}</td>
                    <td>{course.credits}</td>
                    <td>{course.lecturer}</td>
                    <td>{course.cancellationDeadline}</td>
=======
            {props.courses.map((row) =>
                <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.credits}</td>
                    <td>{row.responsibleLecturer} EAP</td>
                    <td>{row.cancellationDeadline}</td>
>>>>>>> c620894b8df139173e5378b73db904f4113950d9
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default RegisteredCoursesTable;