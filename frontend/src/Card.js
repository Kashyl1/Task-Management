import React from 'react';
import './Card.css';
import { FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

const Card = ({ task, onEdit, onDelete, onToggleCompleted, showArchived }) => {
    return (
        <div className="card">
            <div className="card-container">
                <h4>Title: <b>{task.title}</b></h4>
                <p>Description: {task.description}</p>
                <p>Due date: {new Date(task.dueDate).toLocaleString()}</p>
                {!task.completedStatus && !showArchived && (
                    <button onClick={() => onToggleCompleted(task.id, true)} className="complete-button">
                        <FiCheckSquare /> Complete
                    </button>
                )}
                {!showArchived && (
                    <>
                        <button onClick={() => onEdit(task)} className="edit-button">
                            <FiEdit /> Edit
                        </button>
                        <button onClick={() => onDelete(task.id)} className="delete-button">
                            <FiTrash2 /> Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;