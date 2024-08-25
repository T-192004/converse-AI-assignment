import React from 'react';
import './index.css';

const Dashboard = ({ holdings }) => {
  return (
    <div className="dashboard">
      <h2>Your Holdings</h2>
      <ul>
        {Object.entries(holdings).map(([stock, transactions]) => {
          const totalShares = transactions.reduce((sum, transaction) => sum + transaction.quantity, 0);

          return (
            <li key={stock} className="holding-item">
              <div className="stock-name">{stock}</div>
              {totalShares > 0 ? (
                <ul className="transactions">
                  {transactions.map((transaction, index) => (
                    <li key={index} className={`transaction ${transaction.action}`}>
                      <span>{transaction.quantity > 0 ? transaction.quantity : 0} shares</span>
                      <span className="date-time">{transaction.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-shares">No shares available</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
