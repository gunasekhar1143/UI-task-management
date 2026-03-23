import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  
  const navigate = useNavigate();

  const cards = [
    { title: "Users", path: "/admin/users" },
    { title: "Projects", path: "/admin/projects" },
    { title: "Tasks", path: "/admin/tasks" },
    { title: "Analytics", path: "/admin/analytics" }
  ];

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">

        <h2 className="logo">Task Manager</h2>

        <ul className="menu">
          <li>Dashboard</li>
          <li>Users</li>
          <li>Projects</li>
          <li>Tasks</li>
          <li>Analytics</li>
        </ul>

      </div>

      {/* Main Section */}
      <div className="main-section">


        <h2 className="welcome">Welcome back, Admin</h2>

        {/* Cards */}
        <div className="cards">

          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              onClick={() => navigate(card.path)}
            >
              {card.title}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;