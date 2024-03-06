import React, { useState } from 'react';
import axios from 'axios';
import TaskLists from './TasksList';

const TaskForm = ({ onSuccess }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/tasks/addTask', { description, dueDate });
            onSuccess();

        } catch (error) {
            console.error('Error adding task:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Due Date:</label>
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
