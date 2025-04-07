import React from "react";

const StudentList = () => {
  const students = [
    { id: 101, name: "Thariga" },
    { id: 102, name: "Teju" },
    { id: 103, name: "Jeni" },
    { id: 104, name: "Ananya" },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} (ID: {student.id}) 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
