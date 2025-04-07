import React from "react";
import { useFormik } from "formik";

const Simpleform = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      college: "",
      department: "",
    },
    onSubmit: (values) => {
      console.log(values); 
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder="Enter your name"
      />

      <label htmlFor="college">College</label>
      <input
        id="college"
        name="college"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.college}
        placeholder="Enter your college"
      />

<     label htmlFor="department">Department</label>
      <input
        id="department"
        name="department"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.department}
        placeholder="Enter your department"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Simpleform;
