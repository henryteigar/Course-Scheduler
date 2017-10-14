import React from 'react';

const CourseSearchRow = (prop) => {
    return (
        <tr>
            <td><input type="checkbox"/></td>
            <td>{prop.rowData.title}</td>
            <td>{prop.rowData.credits} EAP</td>
            <td>{prop.rowData.schedule}</td>
            <td>{prop.rowData.responsibleLecturer}</td>
            <td>{prop.rowData.currentAttendants}/{prop.rowData.maxAttendants}</td>
            <td>{prop.rowData.cancellationDeadline}</td>
        </tr>
    )
}

export default CourseSearchRow;