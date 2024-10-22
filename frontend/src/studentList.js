import React from "react";
import "./studentListCss.css";

function StudentList({ students, deleteStudent, handleEdit }) {
  if (!Array.isArray(students) || students.length === 0) {
    return <h2 className="empty-list">Student List is empty!</h2>;
  }

  return (
    <div className="student-list-container">
      <h2 className="student-list-title">Student List</h2>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student._id} className="student-card">
            <div className="student-info">
              <h3>Student {student.StudentID}</h3>
              <p>
                <strong>Name:</strong> {student.Name}
              </p>
              <p>
                <strong>Role:</strong> {student.Roll}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(student.Birthday).toLocaleDateString()}
              </p>
              <p>
                <strong>Address:</strong> {student.Address}
              </p>
            </div>
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => handleEdit(student)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteStudent(student._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
