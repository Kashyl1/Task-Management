import React, { useState } from 'react';
import axios from 'axios';
import './TaskFormEdit.css';

const TaskFormEdit = ({ task, onSuccess }) => {
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/tasks/${task.id}`, { description, dueDate });
            onSuccess();
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating task:', error);
            setErrorMessage(error.response?.data.message || 'Error occurred.');

        }
    };

    return (
            <form onSubmit={handleSubmit} className="task-form-edit">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group">
                    <label htmlFor="description-edit" className="label-edit">Description:</label>
                    <input
                        id="description-edit"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add task's description"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="due-date-edit" className="label-edit">Term:</label>
                    <input
                        id="due-date-edit"
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-success">Update Task</button>
            </form>
        );
    };

export default TaskFormEdit;