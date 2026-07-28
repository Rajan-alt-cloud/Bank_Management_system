import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../services/api";

function Withdraw() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    try {
      const response = await fetch(`${API_BASE_URL}/withdraw/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Money Withdrawn Successfully");
        setAmount("");
        navigate("/dashboard");
      } else {
        alert(data.message || "Withdrawal Failed");
      }
    } catch (error) {
      alert("Server Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Withdraw Money</h1>

      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Withdraw
        </button>
      </form>
    </div>
  );
}

export default Withdraw;
