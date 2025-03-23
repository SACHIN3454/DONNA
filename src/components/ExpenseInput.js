import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const quickCategories = ["Food", "Fuel", "Dress", "Family Food", "Others"];

function ExpenseInput({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [recent, setRecent] = useState([]);

  const handleQuickCategory = (cat) => {
    setCategory(cat);
  };

  const handleSubmit = async () => {
    if (!amount || (!category && category !== "Others")) {
      toast.error("Please enter amount and category");
      return;
    }

    const expense = {
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "expenses"), expense);
      toast.success("💸 Expense Added");
      onAdd(expense);
      setRecent((prev) => [expense, ...prev.slice(0, 2)]);
      setAmount("");
      setCategory("");
    } catch (err) {
      toast.error("Error adding expense");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <input
        type="number"
        placeholder="Enter amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div style={{ margin: "1rem 0" }}>
        {quickCategories.map((cat) => (
          <button
            key={cat}
            style={{
              margin: "0.25rem",
              padding: "0.4rem 0.8rem",
              backgroundColor: category === cat ? "#fbab57" : "#f3f3f3",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleQuickCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Or type your category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Expense</button>

      {recent.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>🧾 Recently Added:</h4>
          <ul>
            {recent.map((e, i) => (
              <li key={i}>
                ₹{e.amount} – {e.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExpenseInput;
