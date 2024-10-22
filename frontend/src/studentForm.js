import React, { useState, useEffect } from "react";
import "./studentFormCss.css";

function StudentForm({ addStudent, updateStudent, studentToEdit }) {
  const [StudentID, setStudentID] = useState("");
  const [Name, setName] = useState("");
  const [Roll, setRoll] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Address, setAddress] = useState("");
  const [_id, setID] = useState("");

  useEffect(() => {
    if (studentToEdit) {
      setID(studentToEdit._id);
      setStudentID(studentToEdit.StudentID);
      setName(studentToEdit.Name);
      setRoll(studentToEdit.Roll);
      setBirthday(new Date(studentToEdit.Birthday).toISOString().split("T")[0]);
      setAddress(studentToEdit.Address);
    } else {
      setID("");
      setStudentID("");
      setName("");
      setRoll("");
      setBirthday("");
      setAddress("");
    }
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentToEdit) {
      updateStudent({
        _id,
        StudentID: Number(StudentID),
        Name,
        Roll: Number(Roll),
        Birthday,
        Address,
      });
    } else {
      addStudent({
        StudentID: Number(StudentID),
        Name,
        Roll: Number(Roll),
        Birthday,
        Address,
      });
    }
    setStudentID("");
    setName("");
    setRoll("");
    setBirthday("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>{studentToEdit ? "Edit Student" : "Add New Student"}</h2>
      <div className="form-group">
        <label htmlFor="student-id">Student ID</label>
        <input
          id="student-id"
          type="number"
          placeholder="Student ID"
          value={StudentID}
          onChange={(e) => setStudentID(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="roll">Roll</label>
        <input
          id="roll"
          type="number"
          placeholder="Roll"
          value={Roll}
          onChange={(e) => setRoll(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Birthday</label>
        <input
          id="birthday"
          type="date"
          placeholder="Birthday"
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        {studentToEdit ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
