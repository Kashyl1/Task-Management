import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteTaskButton from './DeleteTaskButton';
import TaskFormEdit from './TaskFormEdit';
import Card from './Card';
import './TasksList.css';
import Modal from './Modal';
import './TaskFormAdd.css';
import { FiArchive, FiInbox } from 'react-icons/fi';


const TasksList = ({ shouldRefreshTasks }) => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showArchived, setShowArchived] = useState(false);

    const fetchTasks = async () => {
        const endpoint = showArchived ? '/api/tasks/archived' : '/api/tasks/active';
        try {
            const response = await axios.get(endpoint);
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
    }, [showArchived]);

    const handleEdit = (taskToEdit) => {
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

    const onToggleCompleted = (taskId, completedStatus) => {
        axios.put(`/api/tasks/${taskId}/complete`, { completedStatus })
            .catch(error => console.error('Error updating task:', error));
        fetchTasks();
    };

    return (
        <div className="tasks-container">
                <div className="add-task-card" onClick={() => setShowArchived(!showArchived)}>
                    <div className="add-icon">{showArchived ? '📂' : '🗂️'}</div>
                    <div className="add-text">{showArchived ? "Show Active Tasks" : "Show Archived tasks"}</div>
                </div>
            <div className="tasks-list">
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        task={task}
                        onEdit={() => handleEdit(task)}
                        onDelete={() => handleDelete(task.id)}
                        onToggleCompleted={onToggleCompleted}
                        showArchived={showArchived}
                    />
                ))}
                {editingTask && (
                    <Modal onClose={() => setEditingTask(null)}>
                        <TaskFormEdit task={editingTask} onSuccess={handleEditSuccess} />
                    </Modal>

                )}
            </div>
        </div>
    );
};

export default TasksList;
