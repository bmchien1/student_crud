import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './studentForm';
import StudentList from './studentList';

const API_URL = 'http://localhost:3001';

function App() {
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);


  // Lấy danh sách sinh viên từ server
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Fetched students:', response.data);
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async (student) => {
    try {
      const response = await axios.post(API_URL, student);
      setStudents([...students, response.data.data]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const response = await axios.put(`${API_URL}/${student._id}`, student);
      setStudents(students.map(s => (s._id === student._id ? response.data.data : s)));
      setStudentToEdit(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log("Student id: " + id);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  const handleEdit = (student) => {
    setStudentToEdit(student);
  };

  return (
    <div className="App">
      <h1>Student Management</h1>
      <StudentForm addStudent={addStudent} updateStudent={updateStudent} studentToEdit={studentToEdit} />
      <StudentList students={students} deleteStudent={deleteStudent} handleEdit={handleEdit} />
    </div>
  );
}

export default App;