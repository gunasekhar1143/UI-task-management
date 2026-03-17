import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import "../css/dashboard.css";

function Card({ title, path }) {

  const navigate = useNavigate();

  return (
    <div
      className="info-card"
      onClick={() => navigate(path)}
    >
      <div className="card-title">{title}</div>
      <div className="card-value">Open</div>
      <div className="card-desc">View your {title}</div>
    </div>
  );
}

export default function Dashboard() {

  const cards = [
    { title: "Projects", path: "/users/projects" },
    { title: "Tasks", path: "/users/tasks" },
    { title: "Progress", path: "/progress" },
    { title: "Performance", path: "/analytics" }
  ];

  return (

    <DashboardLayout>

      <div className="welcome">
        <h1>Welcome back</h1>
        <p>Here's your personal overview for today.</p>
      </div>

      <div className="cards">
        {cards.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            path={item.path}
          />
        ))}
      </div>

    </DashboardLayout>

  );
}