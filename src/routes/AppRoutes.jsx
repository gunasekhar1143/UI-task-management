import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

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
import Progress from "../components/progress/Progress";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login1 />} />

        {/* ✅ USER ROUTES */}
        <Route
          path="/users/*"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<UserProjects />} />
                <Route path="tasks" element={<UserTasks />} />
                <Route path="progress" element={<Progress />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* ✅ ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Routes>
                <Route path="adminDashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="users/edit/:id" element={<UserEdit />} />

                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/view/:id" element={<ProjectView />} />
                <Route path="projects/create" element={<ProjectCreate />} />
                <Route path="projects/edit/:id" element={<ProjectEdit />} />
              </Routes>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;