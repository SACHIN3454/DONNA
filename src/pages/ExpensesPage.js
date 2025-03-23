import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
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

  const handleAdd = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  return (
    <div>
      <h2>💰 Expense Tracker</h2>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} />
      <ExpenseChart data={expenses} />
    </div>
  );
};

export default ExpensesPage;
