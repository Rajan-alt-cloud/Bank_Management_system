import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiFetch from "../services/apiFetch";

function Deposit() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch("/deposit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      // Agar token expire hone ke baad login page par redirect hua
      if (!response) {
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Money Deposited Successfully");

        setAmount("");

        navigate("/dashboard");
      } else {
        alert(data.message || "Deposit Failed");
      }
    } catch (error) {
      alert("Server Error: " + error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bank-form-page">
        <div className="bank-form-card">

          <div className="bank-form-header">
            <p>MyBank</p>

            <h1>Deposit Money</h1>

            <span>
              Add money to your bank account
            </span>
          </div>

          <div className="bank-form-content">

            <div className="form-info-box">
              <span>💰</span>

              <div>
                <h3>Secure Deposit</h3>

                <p>
                  Enter the amount you want to add
                  to your account.
                </p>
              </div>
            </div>

            <form onSubmit={handleDeposit}>

              <div className="bank-input-group">
                <label>
                  Deposit Amount
                </label>

                <div className="amount-input">
                  <span>₹</span>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    min="1"
                    required
                  />
                </div>
              </div>

              <button
                className="primary-bank-btn"
                type="submit"
              >
                Deposit Money
              </button>

            </form>

            <button
              className="secondary-bank-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Deposit;
