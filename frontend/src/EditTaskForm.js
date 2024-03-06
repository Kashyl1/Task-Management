import React, { useState } from 'react';
import axios from 'axios';

const EditTaskForm = ({ task, onSuccess }) => {
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/tasks/${task.id}`, { description, dueDate });
            onSuccess();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Update Task</button>
        </form>
    );
};

export default EditTaskForm;