import React from 'react';
import axios from 'axios';

const DeleteTaskButton = ({ taskId, onSuccess }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            onSuccess();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete Task</button>
    );
};

export default DeleteTaskButton;