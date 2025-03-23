import React from "react";

const ExpenseList = ({ expenses }) => (
  <ul>
    {expenses.map((e, index) => (
      <li key={index}>
        ₹{e.amount} - {e.category} ({new Date(e.date).toLocaleDateString()})
      </li>
    ))}
  </ul>
);

export default ExpenseList;
