import React from 'react';

const CourseSearchRow = (prop) => {
    return (
        <tr>
            <td><input type="checkbox"/></td>
            <td>{prop.rowData.courseName}</td>
            <td>{prop.rowData.credits}</td>
            <td>{prop.rowData.schedule}</td>
            <td>{prop.rowData.lecturer}</td>
            <td>{prop.rowData.regPersons}</td>
            <td>{prop.rowData.cancellationDeadline}</td>
        </tr>
    )
}

export default CourseSearchRow;