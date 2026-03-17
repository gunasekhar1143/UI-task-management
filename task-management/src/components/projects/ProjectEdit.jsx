import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectService";
import "../../css/ProjectView.css";

function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: "",
    status: ""
  });

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const response = await getProjectById(id);
      setProject(response.data);
    } catch (error) {
      console.error("Error loading project", error);
    }
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(id, project);
      alert("Project updated successfully");
      navigate(`/projects/view/${id}`); // go back to ProjectView
    } catch (error) {
      console.error("Error updating project", error);
    }
  };

  return (
    <div className="project-view-container">
      <h2 className="page-title">Edit Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={project.status}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            <option value="NEW">NEW</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="ON_HOLD">ON_HOLD</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>

        <button type="submit" className="update-btn">
          Update Project
        </button>
      </form>
    </div>
  );
}

export default ProjectEdit;