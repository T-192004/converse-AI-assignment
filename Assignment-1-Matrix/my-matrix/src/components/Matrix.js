import React, { useState } from 'react';
import './Matrix.css';

const Matrix = () => {
  const [boxes, setBoxes] = useState(Array(9).fill('lightblue')); // Initialize all boxes with lightblue color
  const [clickOrder, setClickOrder] = useState([]); // Track the order of clicks

  const handleClick = (index) => {
    if (clickOrder.length < 9 && boxes[index] !== 'green') {
      const newBoxes = [...boxes];
      newBoxes[index] = 'green';
      setBoxes(newBoxes);

      const newClickOrder = [...clickOrder, index];
      setClickOrder(newClickOrder);

      // If the last box is clicked, change all boxes to orange in the order of clicks
      if (newClickOrder.length === 9) {
        setTimeout(() => {
          changeToOrange(newClickOrder);
        }, 500);
      }
    }
  };

  const changeToOrange = (order) => {
    const newBoxes = [...boxes];
    order.forEach((index, i) => {
      setTimeout(() => {
        newBoxes[index] = 'orange';
        setBoxes([...newBoxes]);
      }, i * 300);
    });
  };

  const resetGame = () => {
    setBoxes(Array(9).fill('lightblue')); // Reset all boxes to lightblue
    setClickOrder([]); // Reset the click order
  };

  return (
    <div>
      <div className="matrix">
        {boxes.map((color, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">Play Again</button>
    </div>
  );
};

export default Matrix;
