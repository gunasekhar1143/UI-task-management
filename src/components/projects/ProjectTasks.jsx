import { useEffect, useState } from "react";
import {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask
} from "../../services/taskService";
import "../../css/ProjectTasks.css";

function ProjectTasks({ projectId, members }) {

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {

    try {

      const response = await getTasksByProjectId(projectId);
      setTasks(response.data);

    } catch (error) {

      console.error("Error loading tasks", error);

    }

  };

  const handleCreateTask = async () => {

    try {

      const task = {
        title,
        description,
        projectId,
        userId: Number(userId),
        dueDate 
      };

      await createTask(task);

      resetForm();
      loadTasks();

    } catch (error) {

      console.error("Error creating task", error);

    }

  };

  const handleEditClick = (task) => {

    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setUserId(task.userId);
    setStatus(task.status);

    if (task.dueDate) {
      setDueDate(task.dueDate.substring(0, 10));
    }

    setShowForm(true);

  };

  const handleUpdateTask = async () => {

    try {

      const updatedTask = {
        title,
        description,
        projectId,
        userId: Number(userId),
        status,
        dueDate 
      };

      await updateTask(editTaskId, updatedTask);

      resetForm();
      loadTasks();

    } catch (error) {

      console.error("Error updating task", error);

    }

  };

  const handleDeleteTask = async (taskId) => {

    try {

      await deleteTask(taskId);
      loadTasks();

    } catch (error) {

      console.error("Error deleting task", error);

    }

  };

  const resetForm = () => {

    setTitle("");
    setDescription("");
    setUserId("");
    setStatus("TODO");
    setDueDate(""); 
    setEditTaskId(null);
    setShowForm(false);

  };

  return (

    <div className="tasks-section">

      <h3>Project Tasks</h3>

      <button onClick={() => setShowForm(true)}>
        + Add Task
      </button>

     {showForm && (

  <div className="task-modal-overlay">

    <div className="task-modal">

      <div className="task-modal-header">

        <h3>{editTaskId ? "Edit Task" : "Create Task"}</h3>

        <button
          className="close-btn"
          onClick={resetForm}
        >
          ✕
        </button>

      </div>

      <div className="task-form">

        <div>
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Assign Member</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="TODO">TODO</option>
            <option value="INPROGRESS">INPROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="task-form-buttons">

          {editTaskId ? (

            <button onClick={handleUpdateTask}>
              Update Task
            </button>

          ) : (

            <button onClick={handleCreateTask}>
              Create Task
            </button>

          )}

          <button onClick={resetForm}>
            Cancel
          </button>

        </div>

      </div>

    </div>

  </div>

      )}

      {tasks.length === 0 ? (

        <p>No tasks added yet.</p>

      ) : (

        <table className="tasks-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>User</th>
              <th>Due Date</th> 
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr key={task.id}>

                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <span className={`status-${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>{task.userId}</td>
                <td>
                  {task.dueDate
                    ? task.dueDate
                    : "N/A"}
                </td>

                <td>

                  <button onClick={() => handleEditClick(task)}>
                    Edit
                  </button>

                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default ProjectTasks;