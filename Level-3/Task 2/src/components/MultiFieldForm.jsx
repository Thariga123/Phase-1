import React from "react";
import { useFormik } from "formik";

const MultiFieldForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    onSubmit: (values) => {
      console.log("Form Data:", values);
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
        placeholder="Enter your name"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="Enter your email"
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        onChange={formik.handleChange}
        value={formik.values.phone}
        placeholder="Enter your phone number"
      />

      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.address}
        placeholder="Enter your address"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MultiFieldForm;
