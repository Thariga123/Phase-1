import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

const MultiFieldForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted ✅", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2>Registration Form</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        placeholder="Enter your name"
      />
      {formik.touched.name && formik.errors.name && (
        <div className="error">{formik.errors.name}</div>
      )}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        placeholder="Enter your email"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        onChange={formik.handleChange}
        value={formik.values.phone}
        onBlur={formik.handleBlur}
        placeholder="Enter your phone number"
      />
      {formik.touched.phone && formik.errors.phone && (
        <div className="error">{formik.errors.phone}</div>
      )}

      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.address}
        onBlur={formik.handleBlur}
        placeholder="Enter your address"
      />
      {formik.touched.address && formik.errors.address && (
        <div className="error">{formik.errors.address}</div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MultiFieldForm;
