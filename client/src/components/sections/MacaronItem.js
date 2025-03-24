import React from 'react';
import './MacaronItem.css';

function MacaronItem({ macaron, isSelected, onSelect }) {
  return (
    <div 
      className={`macaron-item ${isSelected ? 'selected' : ''} ${macaron.isSpecial ? 'special' : ''}`}
      onClick={onSelect}
    >
      <div className="macaron-image-container">
        <img src={macaron.image} alt={macaron.name} className="macaron-image" />
        {macaron.isSpecial && <span className="special-badge">Special</span>}
        {isSelected && <div className="selected-overlay"><span>✓</span></div>}
      </div>
      <div className="macaron-details">
        <h3 className="macaron-name">{macaron.name}</h3>
        <p className="macaron-description">{macaron.description}</p>
        <p className="macaron-price">${macaron.price.toFixed(2)}</p>
      </div>
      <button className="select-btn">
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

export default MacaronItem;