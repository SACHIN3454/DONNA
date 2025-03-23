import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (amount && category) {
      const expense = { amount: parseFloat(amount), category, note, date: new Date().toISOString() };
      await addDoc(collection(db, "expenses"), expense);
      onAdd(expense);
      setAmount("");
      setCategory("");
      setNote("");
    }
  };

  return (
    <div>
      <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
}

export default ExpenseForm;
