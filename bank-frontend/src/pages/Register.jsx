import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful");

        setUsername("");
        setEmail("");
        setPassword("");

        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
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
          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Create your secure bank account
          </p>

          <form onSubmit={handleRegister}>

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
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="login-btn"
              type="submit"
            >
              Create Account
            </button>

          </form>

          <div className="register-section">
            <p>Already have an account?</p>

            <button
              className="register-btn"
              type="button"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
