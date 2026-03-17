import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import "../css/Login1.css";

function Login1() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(data);

      const token = response.data.token;

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      console.log("User Role:", role);

      setMessage("Login Successful");
      setUserData(response.data);

      if (role === "ADMIN") {
        navigate("/adminDashboard");
      } else if (role === "USER") {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log("Login Error:", error);
      setMessage("Login Failed");
      setUserData(null);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button type="submit">Login</button>
        </form>

        <p>{message}</p>

        {userData && (
          <div>
            <h3>Response Data:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login1;