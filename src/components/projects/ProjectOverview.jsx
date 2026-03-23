import { useNavigate } from "react-router-dom";

function ProjectOverview({ project, handleDelete }) {

  const navigate = useNavigate();

  return (

    <div className="project-card">

      <p><b>ID:</b> {project.id}</p>
      <p><b>Name:</b> {project.name}</p>
      <p><b>Description:</b> {project.description}</p>
      <p><b>Status:</b> {project.status}</p>
      <p><b>Created At:</b> {project.createdAt}</p>
      <p><b>Updated At:</b> {project.updatedAt}</p>

      <div className="project-actions">

        <button
          className="update-btn"
          onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
        >
          Update
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default ProjectOverview;