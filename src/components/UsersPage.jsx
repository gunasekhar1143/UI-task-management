import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUser } from "../services/userService";
import "../css/UserPage.css";

function UsersPage() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleStatusToggle = async (user) => {
    try {

      const updatedUser = {
        ...user,
        status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
      };

      await updateUser(user.id, updatedUser);

      loadUsers();

    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <div>
        <input
          type="text"
          placeholder="Search user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => navigate("/admin/register")}>
          Add User
        </button>
      </div>

      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredUsers.map((user) => (
            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>{user.status}</td>

              <td>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : ""}
              </td>

              <td>

                <button
                  className="update-btn"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleStatusToggle(user)}
                >
                  {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UsersPage;