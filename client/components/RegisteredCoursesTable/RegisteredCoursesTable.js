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
            {props.courses.map((course) =>
                <tr key={course.id}>
                    <td>{course.name_eng}</td>
                    <td>{course.credits}</td>
                    <td>{course.lecturer}</td>
                    <td>{course.cancellation_date}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default RegisteredCoursesTable;