import React, { useState, useEffect } from 'react';

const DragReorder = ({ level, onComplete, completed }) => {
  const [items, setItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    // Initialize items from the level prop
    setItems(level.original.map((word, index) => ({
      id: `word-${index}`,
      content: word
    })));
    setSubmitted(false);
    setIsCorrect(false);
  }, [level]);

  // Handle drag start
  const handleDragStart = (e, index) => {
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = "move";
    // Needed for Firefox
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.target.classList.add("dragging");
  };

  // Handle drag over
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
    setDragOverIndex(null);
  };

  // Handle drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    
    const itemsCopy = [...items];
    const draggedItemIndex = itemsCopy.findIndex(item => item.id === draggedItem.id);
    
    // Remove the item from its original position
    itemsCopy.splice(draggedItemIndex, 1);
    // Insert it at the new position
    itemsCopy.splice(index, 0, draggedItem);
    
    setItems(itemsCopy);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // Handle submitting the answer
  const handleSubmit = () => {
    const current = items.map(item => item.content);
    const isCorrect = JSON.stringify(current) === JSON.stringify(level.correctOrder);
    if (isCorrect) onComplete();
    setSubmitted(true);
    setIsCorrect(isCorrect);
  };

  return (
    <div className="drag-reorder">
      <div className="drag-list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`drag-item ${dragOverIndex === index ? 'drag-over' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
          >
            {item.content}
          </div>
        ))}
      </div>

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Check Order
        </button>
      )}

      {submitted && (
        <p className={isCorrect ? 'correct-msg' : 'incorrect-msg'}>
          {isCorrect ? '✅ Perfect order!' : '❌ That\'s not the correct sequence.'}
        </p>
      )}
    </div>
  );
};

export default DragReorder;