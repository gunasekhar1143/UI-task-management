import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { connectWebSocket } from "../services/webSocket";
import { getNotificationsByUserId } from "../services/notificationService";
import "../css/dashboard.css";

export default function DashboardLayout({ children }) {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Format Date & Time
  const formatTime = (time) => {
    const date = new Date(time);

    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    return `${formattedDate} • ${formattedTime}`;
  };

useEffect(() => {
  if (userId) {

    console.log("Connecting WebSocket for user:", userId);

    connectWebSocket(userId, (newNotification) => {

      console.log("🔥 MESSAGE RECEIVED:", newNotification);

      setNotifications((prev) => [newNotification, ...prev]);

    });

  }
}, [userId]);

  // ✅ Load user + notifications on page load
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setName(decoded.name);
        setEmail(decoded.sub);
        setUserId(decoded.id);

        fetchNotifications(decoded.id); 

        

      } catch (err) {
        console.log("Invalid token");
      }
    }

  }, []);

  // ✅ Fetch notifications
  const fetchNotifications = async (uid) => {
    try {
      const res = await getNotificationsByUserId(uid);
      setNotifications(res.data);
    } catch (err) {
      console.log("Error fetching notifications");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Task Manager</h2>

        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/users/projects")}>Projects</li>
          <li onClick={() => navigate("/users/tasks")}>Tasks</li>
          <li onClick={() => navigate("/analytics")}>Analytics</li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">

        {/* Topbar */}
        <div className="topbar">

          <input type="text" placeholder="Search anything..." />

          <div className="profile">

            {/* Profile Info */}
            <div className="profile-info">
              <div className="profile-name">{name}</div>
              <div className="profile-email">{email}</div>
            </div>

            {/* 🔔 Notifications */}
            <div
              className="notifications-wrapper"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="notifications-link">
                🔔 Notifications
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="badge">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </div>

              {showDropdown && (
                <div className="notifications-dropdown">

                  <div className="dropdown-header">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <p className="empty">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="notification-item">

                        <div className="notif-message">
                          {n.message}
                        </div>

                        <div className="notif-time">
                          {formatTime(n.createdAt)}
                        </div>

                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Logout */}
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>

          </div>

        </div>

        {children}

      </div>

    </div>

  );
}