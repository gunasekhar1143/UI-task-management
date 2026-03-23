import { useNavigate } from "react-router-dom";

function AdminCard({ title, description, path, color }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      style={{
        backgroundColor: color,
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        cursor: "pointer",
        width: "220px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default AdminCard;