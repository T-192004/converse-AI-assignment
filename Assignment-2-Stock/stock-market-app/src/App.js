import React, { useState, useEffect } from 'react';
import StockTradingPanel from './components/StockTradingPanel';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [holdings, setHoldings] = useState({});

  useEffect(() => {
    // Fetch initial stock data from StockData.org
    fetch('https://api.stockdata.org/v1/data/quote?symbols=AAPL%2CTSLA%2CMSFT&api_token=mPWyYc8NquXgORuAPc3cTFKRL9zSp4F13cao6Ylt', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched stock data:', data); // Debugging: Log fetched data
        setStocks(data.data); // Adjust based on actual data structure
      })
      .catch(error => console.error('Error fetching stock data:', error));
  }, []);

  const handleTrade = (stock, quantity, action) => {
    const date = new Date().toLocaleString(); // Get the current date and time

    // Clone the current holdings
    const updatedHoldings = { ...holdings };

    // Initialize the stock's transaction history if it doesn't exist
    if (!updatedHoldings[stock]) {
      updatedHoldings[stock] = [];
    }

    // Calculate the current total quantity of shares for the stock
    const totalShares = updatedHoldings[stock].reduce((sum, transaction) => sum + transaction.quantity, 0);

    // Handle selling shares
    if (action === 'sell') {
      if (totalShares < quantity) {
        alert(`Insufficient shares to sell. You have ${totalShares} shares of ${stock}.`);
        return;
      }

      // Deduct only the specified quantity from the holdings
      updatedHoldings[stock].push({
        quantity: -quantity,
        date,
        action,
      });

    } else if (action === 'buy') {
      // Handle buying shares
      updatedHoldings[stock].push({
        quantity,
        date,
        action,
      });
    }

    setHoldings(updatedHoldings);
  };

  return (
    <div className="App">
      <h1>Real-Time Stock Market Application</h1>
      <StockTradingPanel stocks={stocks} onTrade={handleTrade} />
      <Dashboard holdings={holdings} />
    </div>
  );
}

export default App;
