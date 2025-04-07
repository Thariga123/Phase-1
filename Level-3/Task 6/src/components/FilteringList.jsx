import React, { useState } from "react";

const students = [
  "Thariga",
  "Suthan",
  "Agalya",
  "Vaishnavi",
  "Reema",
  "Karthik",
  "Ananya",
  "Parkavi",
];

const FilteringList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Student Directory</h2>
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "0.7rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <ul>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <li key={index}>{student}</li>
          ))
        ) : (
          <p>No matching students found.</p>
        )}
      </ul>
    </div>
  );
};

export default FilteringList;
