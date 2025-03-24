import React, { useState } from 'react';
import './Shop.css';
import img1 from '../../images/cremeBruleeMacaron 1.jpg';
import img2 from '../../images/cremeBruleeMacaron 2.jpg';
import img3 from '../../images/cremeBruleeMacaron 3.jpg';

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMacaron, setSelectedMacaron] = useState(null);
  
  // Sample macaron products - reduced to 6 for better fit
  const macarons = [
    {
      id: 1,
      name: 'Vanilla Dream',
      description: 'Classic vanilla flavor with a smooth buttercream filling',
      price: 2.50,
      image: img1,
      color: '#F8E9D6', // Vanilla color
      category: 'classic'
    },
    {
      id: 2,
      name: 'Raspberry Delight',
      description: 'Sweet raspberry flavor with a tart raspberry jam center',
      price: 2.75,
      image: img2,
      color: '#E6A9B7', // Raspberry color
      category: 'fruity'
    },
    {
      id: 3,
      name: 'Chocolate Truffle',
      description: 'Rich chocolate shells with a ganache filling',
      price: 2.50,
      image: img3,
      color: '#5C3A21', // Chocolate color
      category: 'classic'
    },
    {
      id: 4,
      name: 'Pistachio Paradise',
      description: 'Nutty pistachio shells with a creamy pistachio filling',
      price: 2.75,
      image: img1,
      color: '#A3C9A8', // Pistachio color
      category: 'nutty'
    },
    {
      id: 5,
      name: 'Lemon Zest',
      description: 'Tangy lemon shells with a lemon curd filling',
      price: 2.50,
      image: img2,
      color: '#FFF3B0', // Lemon color
      category: 'fruity'
    },
    {
      id: 6,
      name: 'Salted Caramel',
      description: 'Sweet shells with a decadent salted caramel filling',
      price: 2.75,
      image: img3,
      color: '#C1996B', // Caramel color
      category: 'special'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'classic', name: 'Classic' },
    { id: 'fruity', name: 'Fruity' },
    { id: 'nutty', name: 'Nutty' },
    { id: 'special', name: 'Special' }
  ];

  const filteredMacarons = activeCategory === 'all' 
    ? macarons 
    : macarons.filter(macaron => macaron.category === activeCategory);

  const handleMacaronClick = (macaron) => {
    setSelectedMacaron(macaron);
  };

  return (
    <div className="shop-section">
      <h2 className="section-title">Our Macarons</h2>
      
      <div className="shop-content">
        <div className="shop-sidebar">
          <div className="sidebar-content">
            <h3>Filter by Flavor</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="macaron-box-section">
              <h3 className="box-title">Box Options</h3>
              <div className="box-options">
                <div className="box-option">
                  <h4>6-Pack</h4>
                  <p className="box-price">$15.00</p>
                </div>
                <div className="box-option featured">
                  <h4>12-Pack</h4>
                  <p className="box-price">$28.00</p>
                </div>
              </div>
              <button className="create-box-btn">Create Custom Box</button>
            </div>
          </div>
        </div>
        
        <div className="shop-main">
          <div className="macarons-grid">
            {filteredMacarons.map(macaron => (
              <div 
                key={macaron.id} 
                className="macaron-card"
                onClick={() => handleMacaronClick(macaron)}
              >
                <div className="macaron-image-container">
                  <div 
                    className="macaron-color-backdrop" 
                    style={{ backgroundColor: macaron.color }}
                  ></div>
                  <img 
                    src={macaron.image} 
                    alt={macaron.name} 
                    className="macaron-image" 
                  />
                </div>
                <div className="macaron-card-content">
                  <h3 className="macaron-title">{macaron.name}</h3>
                  <p className="macaron-price">${macaron.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedMacaron && (
        <div className="macaron-detail-modal">
          <div className="modal-backdrop" onClick={() => setSelectedMacaron(null)}></div>
          <div className="modal-content">
            <button className="close-modal-btn" onClick={() => setSelectedMacaron(null)}>×</button>
            <div className="modal-layout">
              <div className="modal-image-section">
                <div 
                  className="modal-color-circle" 
                  style={{ backgroundColor: selectedMacaron.color }}
                ></div>
                <img 
                  src={selectedMacaron.image} 
                  alt={selectedMacaron.name} 
                  className="modal-image" 
                />
              </div>
              <div className="modal-info-section">
                <h2 className="modal-title">{selectedMacaron.name}</h2>
                <div className="modal-category">
                  <span className="category-tag">{selectedMacaron.category}</span>
                </div>
                <p className="modal-description">{selectedMacaron.description}</p>
                <div className="modal-price-section">
                  <p className="modal-price">${selectedMacaron.price.toFixed(2)}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;