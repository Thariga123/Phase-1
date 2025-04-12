import React, { useEffect } from "react";
import { useFormik } from "formik";

const TaskForm = ({ onAdd, onEdit, editingTask }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (editingTask) {
        onEdit({ ...editingTask, ...values });
      } else {
        onAdd(values);
      }
      resetForm();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (editingTask) {
      formik.setValues({
        title: editingTask.title,
        description: editingTask.description,
      });
    }
  }, [editingTask]);

  return (
    <form onSubmit={formik.handleSubmit} className="task-form">
      <input
        name="title"
        type="text"
        placeholder="Task title"
        onChange={formik.handleChange}
        value={formik.values.title}
        required
      />
      <textarea
        name="description"
        placeholder="Task description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <button type="submit">{editingTask ? "Update" : "Add"} Task</button>
    </form>
  );
};

export default TaskForm;
