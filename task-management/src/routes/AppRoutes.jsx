import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login1 from "../components/Login1";
import AdminDashboard from "../components/AdminDashboard";
import UsersPage from "../components/UsersPage";
import ProjectsPage from "../components/ProjectsPage";
import TasksPage from "../components/TasksPage";
import AnalyticsPage from "../components/AnalyticsPage";
import UserRegister from "../components/UserRegister";
import UserEdit from "../components/UserEdit";
import ProjectCreate from "../components/projects/ProjectCreate";
import ProjectView from "../components/projects/ProjectView";
import ProjectEdit from "../components/projects/ProjectEdit";
import UserProjects from "../components/users/UserProjects";
import UserTasks from "../components/users/UserTasks";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/admin/users" element={<UsersPage />} />

        <Route path="/admin/projects" element={<ProjectsPage />} />

        <Route path="/admin/tasks" element={<TasksPage />} />

        <Route path="/admin/analytics" element={<AnalyticsPage />} />

        <Route path="/users/edit/:id" element={<UserEdit />} />

        <Route path="/users/projects" element={<UserProjects />} />

        <Route path="/users/tasks" element={<UserTasks />} />

        <Route path="/register" element={<UserRegister />} />

         <Route path="/projects" element={<ProjectsPage />} />

         <Route path="/projects/view/:id" element={<ProjectView />} />

        <Route path="/projects/create" element={<ProjectCreate />} />

        <Route path="/projects/edit/:id" element={<ProjectEdit />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;