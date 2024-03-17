import React from 'react';
import './Card.css';
import { FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

const Card = ({ task, onEdit, onDelete, onToggleCompleted, showArchived }) => {
    return (
        <div className="card">
            <div className="card-container">
                <div className="task-title-section">
                    <h3>Title:</h3>
                    <p className="task-description">{task.title}</p>
                </div>

                <div className="task-description-section">
                    <h3>Description:</h3>
                    <p className="task-description">{task.description}</p>
                </div>

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
