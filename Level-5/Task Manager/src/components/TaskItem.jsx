import React from "react";

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
      />
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
