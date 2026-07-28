import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiFetch from "../services/apiFetch";
import Navbar from "../components/Navbar";

function Transfer() {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch("/transfer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_number: accountNumber,
          amount: amount,
        }),
      });

      // Token expire hone par apiFetch login par redirect karega
      if (!response) {
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Money Transferred Successfully");

        setAccountNumber("");
        setAmount("");

        navigate("/dashboard");
      } else {
        alert(data.message || "Transfer Failed");
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

            <h1>Transfer Money</h1>

            <span>
              Send money securely to another bank account
            </span>
          </div>

          <div className="bank-form-content">

            <div className="form-info-box">
              <span>💸</span>

              <div>
                <h3>Secure Money Transfer</h3>

                <p>
                  Enter the receiver's account number and
                  the amount you want to transfer.
                </p>
              </div>
            </div>

            <form onSubmit={handleTransfer}>

              <div className="bank-input-group">
                <label>
                  Receiver Account Number
                </label>

                <input
                  className="bank-text-input"
                  type="text"
                  placeholder="Enter receiver account number"
                  value={accountNumber}
                  onChange={(e) =>
                    setAccountNumber(e.target.value)
                  }
                  required
                />
              </div>

              <div className="bank-input-group">
                <label>
                  Transfer Amount
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
                Transfer Money
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

export default Transfer;
