import { useState } from "react";
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import "../../css/ProjectCreate.css";

function ProjectCreate() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const project = {
      name,
      description
    };

    try {

      await createProject(project);

      alert("Project created successfully");

      navigate("/projects");

    } catch (error) {

      console.error(error);
      alert("Error creating project");

    }

  };

  return (

    <div className="create-project-container">

      <div className="create-project-card">

        <h2>Create Project</h2>

        <form onSubmit={handleSubmit} className="project-form">

          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter project description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={()=>navigate("/projects")}
            >
              Cancel
            </button>

            <button type="submit" className="create-btn">
              Create Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProjectCreate;