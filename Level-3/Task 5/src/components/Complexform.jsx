import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "You must be at least 18"),
  gender: Yup.string().required("Gender is required"),
});

const ComplexForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("✅ Form Submitted:", values);
      alert("Form submitted successfully!");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2>Complex Registration Form</h2>

      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fullName}
        placeholder="Enter your name"
      />
      {formik.touched.fullName && formik.errors.fullName && (
        <div className="error">{formik.errors.fullName}</div>
      )}

      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        placeholder="Enter your email"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}

      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        placeholder="Enter password"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="error">{formik.errors.password}</div>
      )}

      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        placeholder="Confirm password"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <div className="error">{formik.errors.confirmPassword}</div>
      )}

      <label>Age</label>
      <input
        type="number"
        name="age"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.age}
        placeholder="Enter your age"
      />
      {formik.touched.age && formik.errors.age && (
        <div className="error">{formik.errors.age}</div>
      )}
      
      <label>Gender</label>
      <select
        name="gender"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.gender}
      >
        <option value="">Select Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      {formik.touched.gender && formik.errors.gender && (
        <div className="error">{formik.errors.gender}</div>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default ComplexForm;
