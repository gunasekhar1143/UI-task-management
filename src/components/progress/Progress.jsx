import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { getKanbanBoard } from "../../services/kanbanService";
import { getProjectsByUserId } from "../../services/projectService";
import { jwtDecode } from "jwt-decode";
import "../../css/progress.css";

export default function Progress() {
  const [userId, setUserId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [kanbanData, setKanbanData] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      setUserId(decoded.userId || decoded.id);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
}, []);
  useEffect(() => {
    if (userId) {
      fetchProjectsByUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedProjectId) {
      fetchKanbanBoard(selectedProjectId);
    } else {
      setKanbanData({
        todo: [],
        inProgress: [],
        done: []
      });
    }
  }, [selectedProjectId]);

  const fetchProjectsByUserId = async (userId) => {
    try {
      const response = await getProjectsByUserId(userId);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchKanbanBoard = async (projectId) => {
    try {
      const response = await getKanbanBoard(projectId);
      setKanbanData(response.data);
    } catch (error) {
      console.error("Error fetching kanban board:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="progress-container">
        <div className="progress-header">
          <h1>Project Progress</h1>
          <p>Select a project to view its Kanban board.</p>
        </div>

        <div className="project-select">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProjectId && (
          <div className="kanban-board">
            <div className="kanban-column">
              <h3>TO DO</h3>
              {kanbanData.todo?.length > 0 ? (
                kanbanData.todo.map((task) => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">No tasks</p>
              )}
            </div>

            <div className="kanban-column">
              <h3>IN PROGRESS</h3>
              {kanbanData.inProgress?.length > 0 ? (
                kanbanData.inProgress.map((task) => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">No tasks</p>
              )}
            </div>

            <div className="kanban-column">
              <h3>DONE</h3>
              {kanbanData.done?.length > 0 ? (
                kanbanData.done.map((task) => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">No tasks</p>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}