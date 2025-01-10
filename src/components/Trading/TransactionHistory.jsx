// import React from 'react';

const TransactionHistory = ({ transactions }) => (
  <div className="transaction-history">
    <h2>Historique des Transactions</h2>
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          {transaction.date} - {transaction.type.toUpperCase()} {transaction.crypto} - ${transaction.amount}
        </li>
      ))}
    </ul>
  </div>
);

export default TransactionHistory;
