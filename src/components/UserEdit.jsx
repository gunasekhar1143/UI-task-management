import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import "../css/UserRegister.css";

function UserEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {

      const response = await getUserById(id);
      const user = response.data;

      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setRole(user.role);
      setStatus(user.status);

    } catch (error) {
      console.error("Error loading user", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      role,
      status
    };

    try {

      await updateUser(id, user);

      alert("User Updated Successfully");

      navigate("/admin/users");

    } catch (error) {

      console.error("Update failed", error);
      alert("Update failed");

    }
  };

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>

        <h2>Edit User</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <button className="register-btn" type="submit">
          Update
        </button>

      </form>

    </div>
  );
}

export default UserEdit;