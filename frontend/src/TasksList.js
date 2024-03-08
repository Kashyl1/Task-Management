import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteTaskButton from './DeleteTaskButton';
import TaskFormEdit from './TaskFormEdit';
import Card from './Card';
import './TasksList.css';
import Modal from './Modal';

const TasksList = ({ shouldRefreshTasks }) => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            const sortedTasks = response.data.sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
            setTasks(response.data);
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
    const handleEdit = (taskToEdit) => {
     console.log("Setting editing task:", taskToEdit);
     setEditingTask(taskToEdit);
    };

    const handleDelete = async (taskId) => {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        handleDeleteSuccess();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  return (
    <div className="tasks-list">
        {tasks.map((task) => (
        <Card
            key={task.id}
            task={task}
            onEdit={() => handleEdit(task)}
            onDelete={() => handleDelete(task.id)}
        />
        ))}
            {editingTask && (
                <Modal onClose={() => setEditingTask(null)}>
                <TaskFormEdit task={editingTask} onSuccess={handleEditSuccess} />
            </Modal>
            )}
    </div>
  );
};

export default TasksList;
