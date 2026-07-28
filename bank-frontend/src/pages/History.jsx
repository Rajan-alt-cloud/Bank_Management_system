import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../services/apiFetch";

function History() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiFetch("/history/", {
          method: "GET",
        });

        // Agar token expire hone ke baad login page par redirect hua
        if (!response) {
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Failed to load transaction history"
          );
        }

        const data = await response.json();

        setTransactions(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="history-page">

        <div className="history-container">

          <div className="history-header">

            <div>
              <p className="history-brand">
                MyBank
              </p>

              <h1>
                Transaction History
              </h1>

              <p className="history-subtitle">
                View your recent banking transactions
              </p>
            </div>

            <button
              className="back-dashboard-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>

          </div>

          {error && (
            <div className="history-error">
              {error}
            </div>
          )}

          {transactions.length === 0 ? (
            <div className="empty-history">

              <div className="empty-icon">
                ₹
              </div>

              <h2>
                No Transactions Found
              </h2>

              <p>
                Your transaction history will appear here.
              </p>

            </div>
          ) : (
            <div className="transactions-list">

              {transactions.map(
                (transaction, index) => {

                  const isReceived =
                    transaction.type ===
                    "TRANSFER RECEIVED";

                  const isSent =
                    transaction.type ===
                    "TRANSFER SENT";

                  const isDeposit =
                    transaction.type ===
                    "DEPOSIT";

                  return (
                    <div
                      className="transaction-card"
                      key={index}
                    >

                      <div className="transaction-icon">
                        {isDeposit
                          ? "+"
                          : isReceived
                          ? "↓"
                          : "↑"}
                      </div>

                      <div className="transaction-details">

                        <h3>
                          {transaction.type}
                        </h3>

                        <p>
                          Account Number:{" "}
                          {transaction.account_number}
                        </p>

                        <p className="transaction-date">
                          {new Date(
                            transaction.date
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      <div
                        className={`transaction-amount ${
                          isReceived ||
                          isDeposit
                            ? "amount-positive"
                            : "amount-negative"
                        }`}
                      >
                        {isReceived ||
                        isDeposit
                          ? "+"
                          : "-"}
                        ₹{transaction.amount}
                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default History;
