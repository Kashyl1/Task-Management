import React, { useState } from 'react';
import axios from 'axios';
import TaskLists from './TasksList';
import './TaskFormAdd.css';

const TaskFormAdd = ({ onSuccess }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/tasks/addTask', { description, dueDate });
            onSuccess();
            setErrorMessage('');
        } catch (error) {
             const errorMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
             setErrorMessage(errorMsg);
             console.error('Error adding task:', error);
        }
    };

return (
    <form onSubmit={handleSubmit} className="task-form-add">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
                    <label htmlFor="description" className="label-edit">Description:</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add task's description"
                    autoFocus
                    className="form-control"
                />
            </div>
            <div className="form-group">
                    <label htmlFor="due-date" className="label-edit">Term:</label>
                <input
                    id="due-date"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
};

    export default TaskFormAdd;