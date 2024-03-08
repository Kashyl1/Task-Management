import React from 'react';
import './Card.css';

const Card = ({ task, onEdit, onDelete }) => {
const handleEditClick = () => {
    console.log("Edit button clicked for task:", task.id);
    onEdit();
  };
  return (
    <div className="card">
      <div className="card-container">
        <h4><b>{task.description}</b></h4>
        <p>Due date: {new Date(task.dueDate).toLocaleString()}</p>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Card;