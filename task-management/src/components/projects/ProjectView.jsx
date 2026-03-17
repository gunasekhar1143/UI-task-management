import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectById,
  deleteProject,
  assignUserToProject,
  getProjectMembers
} from "../../services/projectService";

import { getAllUsers } from "../../services/userService";

import ProjectOverview from "./ProjectOverview";
import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";

import "../../css/ProjectView.css";

function ProjectView() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {

    try {

      const projectResponse = await getProjectById(id);
      setProject(projectResponse.data);

      const membersResponse = await getProjectMembers(id);
      setMembers(membersResponse.data);

    } catch (error) {

      console.error("Error loading project", error);

    }

  };

  const handleAssignUser = async (userId) => {

    try {

      const response = await assignUserToProject(id, userId);

      alert(response.data);

      loadProject();

    } catch (error) {

      console.error("Error assigning user", error);

    }

  };

  const handleDelete = async () => {

    try {

      await deleteProject(id);

      alert("Project deleted");

      navigate("/projects");

    } catch (error) {

      console.error(error);

    }

  };

  const handleAddMembers = async () => {

    try {

      const response = await getAllUsers();
      setUsers(response.data);

      setShowUsers(true);

    } catch (error) {

      console.error("Error loading users", error);

    }

  };

  return (

    <div className="project-view-container">

      <h2 className="project-title">{project.name}</h2>

      <div className="tabs">

        <button
          className={activeTab === "overview" ? "tab active" : "tab"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "members" ? "tab active" : "tab"}
          onClick={() => setActiveTab("members")}
        >
          Members
        </button>

        <button
          className={activeTab === "tasks" ? "tab active" : "tab"}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>

      </div>

      <div className="tab-content">

        {activeTab === "overview" && (
          <ProjectOverview
            project={project}
            handleDelete={handleDelete}
          />
        )}

        {activeTab === "members" && (
          <ProjectMembers
            members={members}
            users={users}
            showUsers={showUsers}
            handleAddMembers={handleAddMembers}
            handleAssignUser={handleAssignUser}
          />
        )}

        {activeTab === "tasks" && (
          <ProjectTasks
            projectId={id}
            members={members}
          />
        )}

      </div>

    </div>

  );

}

export default ProjectView;