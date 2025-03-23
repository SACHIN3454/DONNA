import React, { useEffect, useState } from "react";
import ExpenseInput from "../components/ExpenseInput";
import ExpenseChart from "../components/ExpenseChart"; // ✅ fixed import
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const snap = await getDocs(collection(db, "expenses"));
      const data = snap.docs.map((doc) => doc.data());
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  const handleAdd = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <div>
      <h2>💰 Smart Expense Tracker</h2>
      <ExpenseInput onAdd={handleAdd} />
      <ExpenseChart data={expenses} />
    </div>
  );
};

export default ExpensesPage;
