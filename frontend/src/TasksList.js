import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteTaskButton from './DeleteTaskButton';
import EditTaskForm from './EditTaskForm';

const TasksList = ({ shouldRefreshTasks }) => {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [editingTask, setEditingTask] = useState(null);



    const fetchTasks = async () => {
        setIsLoaded(false);
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    const handleDeleteSuccess = () => {
        alert('Task deleted successfully!');
        fetchTasks();
    };

    const handleEditSuccess = () => {
        alert('Task updated successfully!');
        setEditingTask(null);
        fetchTasks();
    };
    useEffect(() => {
      fetchTasks();
    }, [shouldRefreshTasks]);

    return (
        <div>
            <h2>Your Tasks</h2>
            <button onClick={fetchTasks}>Refresh Tasks</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {editingTask?.id === task.id ? (
                            <EditTaskForm task={editingTask} onSuccess={handleEditSuccess} />
                        ) : (
                            <>
                                {task.description} - Time: {new Date(task.dueDate).toLocaleString()}
                                <button onClick={() => setEditingTask(task)}>Edit</button>
                                <DeleteTaskButton taskId={task.id} onSuccess={handleDeleteSuccess} />
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TasksList;
