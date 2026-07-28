import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../services/apiFetch";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  const fetchAccount = async () => {
    try {
      const response = await apiFetch("/account/", {
        method: "GET",
      });

      // apiFetch null return karega agar user login page par redirect ho gaya
      if (!response) {
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load account details");
      }

      const data = await response.json();

      setAccount(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  if (error) {
    return (
      <div className="page">
        <Navbar />

        <div className="error-card">
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button onClick={fetchAccount}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="page">
        <Navbar />

        <div className="loading-card">
          <h2>Loading your account...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <Navbar />

      <main className="dashboard-content">

        <section className="welcome-section">
          <div>
            <p className="small-text">
              Welcome back
            </p>

            <h2>
              {account.username}
            </h2>

            <p>
              {account.email}
            </p>
          </div>
        </section>

        <section className="account-card">
          <div>
            <p>
              Available Balance
            </p>

            <h2>
              ₹{account.balance}
            </h2>
          </div>

          <button onClick={fetchAccount}>
            Refresh Balance
          </button>
        </section>

        <section className="account-info">

          <div>
            <p>
              Account Number
            </p>

            <h3>
              {account.account_number}
            </h3>
          </div>

          <div>
            <p>
              Account Holder
            </p>

            <h3>
              {account.username}
            </h3>
          </div>

        </section>

        <h2 className="section-title">
          Quick Actions
        </h2>

        <section className="actions">

          <button
            className="action-card"
            onClick={() => navigate("/deposit")}
          >
            <span className="action-icon">
              +
            </span>

            <h3>
              Deposit Money
            </h3>

            <p>
              Add money to your bank account
            </p>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/transfer")}
          >
            <span className="action-icon">
              →
            </span>

            <h3>
              Transfer Money
            </h3>

            <p>
              Send money to another account
            </p>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/history")}
          >
            <span className="action-icon">
              ☷
            </span>

            <h3>
              Transaction History
            </h3>

            <p>
              View all your transactions
            </p>
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
