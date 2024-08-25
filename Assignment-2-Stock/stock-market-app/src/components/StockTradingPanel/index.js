import React, { useState } from 'react';
import './index.css'

const StockTradingPanel = ({ stocks, onTrade }) => {
  const [selectedStock, setSelectedStock] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [action, setAction] = useState('buy');

  const handleTrade = () => {
    onTrade(selectedStock, quantity, action);
  };

  return (
    <div className="stock-trading-panel">
      <h2>Trade Stocks</h2>
      <select onChange={(e) => setSelectedStock(e.target.value)}>
        <option value="">Select Stock</option>
        {stocks.map(stock => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        placeholder='0'
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <select onChange={(e) => setAction(e.target.value)}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <button onClick={handleTrade}>Trade</button>
    </div>
  );
};

export default StockTradingPanel;
