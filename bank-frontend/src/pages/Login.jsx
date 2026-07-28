import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        alert("Login Successful");

        navigate("/dashboard");
      } else {
        alert(data.detail || "Invalid Username or Password");
      }
    } catch (error) {
      alert("Server Error: " + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>MyBank</h1>
          <p>Secure Digital Banking</p>
        </div>

        <div className="auth-content">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">
            Login to access your bank account
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="register-section">
            <p>Don't have an account?</p>

            <button
              className="register-btn"
              type="button"
              onClick={() => navigate("/register")}
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
