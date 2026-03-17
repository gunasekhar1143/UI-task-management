import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../components/DashboardLayout";
import { getTasksByUserId, updateTask } from "../../services/taskService";
import "../../css/userTasks.css";

function UserTasks() {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      try {

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        loadTasks(userId);

      } catch (error) {

        console.log("Invalid token");

      }

    }

  }, []);

  const loadTasks = async (userId) => {

    try {

      const res = await getTasksByUserId(userId);
      setTasks(res.data);

    } catch (err) {

      console.log("Error loading tasks", err);

    }

  };

  const handleStatusChange = async (task, newStatus) => {

    const updatedTask = {
      ...task,
      status: newStatus
    };

    try {

      await updateTask(task.id, updatedTask);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: newStatus } : t
        )
      );

    } catch (error) {

      console.log("Error updating task", error);

    }

  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <DashboardLayout>

      <div className="tasks-page">

        <div className="tasks-header">

          <h2>My Tasks</h2>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="tasks-table">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>

            </thead>

            <tbody>

              {filteredTasks.length === 0 ? (

                <tr>
                  <td colSpan="6" className="no-data">
                    No Tasks Found
                  </td>
                </tr>

              ) : (

                filteredTasks.map((task) => (

                  <tr key={task.id}>

                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>

                    <td>

                      <span className={`status-badge ${task.status.toLowerCase()}`}>
                        {task.status}
                      </span>

                    </td>

                    <td>

                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task, e.target.value)
                        }
                      >

                        <option value="TODO">TODO</option>
                        <option value="INPROGRESS">INPROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>

                      </select>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default UserTasks;