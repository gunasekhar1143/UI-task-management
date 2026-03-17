import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../components/DashboardLayout";
import { getProjectsByUserId } from "../../services/projectService";
import "../../css/UserProjects.css";

function UserProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      try {

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        loadProjects(userId);

      } catch (error) {
        console.log("Invalid token");
      }

    }

  }, []);

  const loadProjects = async (userId) => {

    try {

      const response = await getProjectsByUserId(userId);
      setProjects(response.data);

    } catch (error) {

      console.log("Error loading projects", error);

    }

  };

  return (

    <DashboardLayout>

      <div className="projects-page">

        <h2>My Projects</h2>

        {projects.length === 0 ? (

          <p className="no-projects">No Projects Assigned</p>

        ) : (

          <div className="projects-container">

            {projects.map((project) => (

              <div key={project.id} className="project-row">

                <div className="project-info">

                  <h3>{project.name}</h3>

                  <p>{project.description}</p>

                </div>

                <div className="project-status">

                  <span
                    className={`status-badge status-${project.status.toLowerCase()}`}
                  >
                    {project.status}
                  </span>

                </div>

                <div className="project-action">

                  <button className="view-btn">
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default UserProjects;