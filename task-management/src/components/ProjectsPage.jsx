import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/projectService";
import "../css/ProjectPage.css";

function ProjectsPage() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects", error);
    }
  };

  const handleView = (id) => {
    navigate(`/projects/view/${id}`);
  };

  return (
    <div className="projects-container">

      <div className="projects-header">
        <h2>Projects</h2>

        <button 
          className="create-btn"
          onClick={() => navigate("/projects/create")}
        >
          + Create Project
        </button>
      </div>

      <div className="table-container">

        <table className="projects-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {projects.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No Projects Found
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>
                    <span className="status">
                      {project.status}
                    </span>
                  </td>
                  <td>{project.createdAt}</td>
                  <td>{project.updatedAt}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(project.id)}
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProjectsPage;