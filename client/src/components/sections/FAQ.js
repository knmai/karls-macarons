import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "How long do macarons stay fresh?",
      answer: "Our macarons are best enjoyed within 3-5 days of purchase. Store them in an airtight container in the refrigerator, and let them come to room temperature for about 20 minutes before eating for the best flavor and texture."
    },
    {
      question: "Do you offer nationwide shipping?",
      answer: "Yes! We ship our macarons nationwide in specially designed packaging to ensure they arrive in perfect condition. Orders are shipped with expedited delivery to maintain freshness."
    },
    {
      question: "Are your macarons gluten-free?",
      answer: "Yes, our macarons are naturally gluten-free as they're made with almond flour. However, they are prepared in a kitchen that processes gluten, so they may not be suitable for those with severe gluten allergies or celiac disease."
    },
    {
      question: "Can I customize a macaron box?",
      answer: "Absolutely! You can create your own custom box of macarons by selecting your favorite flavors. For special events or bulk orders, we also offer custom colors and packaging options."
    },
    {
      question: "Do you offer vegan macarons?",
      answer: "We currently don't offer vegan macarons as traditional recipes contain egg whites and dairy products. We're working on developing a vegan option that meets our quality standards."
    },
    {
      question: "What's the difference between your regular and special macarons?",
      answer: "Our special macarons feature unique, seasonal flavors and often include premium ingredients like exotic fruits, fine liqueurs, or specialty chocolate. They often have more complex flavor profiles and special decorative elements."
    }
  ];
  
  return (
    <div className="faq-section">
      <h2 className="section-title">Frequently Asked Questions</h2>
      
      <div className="faq-container">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div 
              className="faq-question" 
              onClick={() => toggleAccordion(index)}
            >
              <h3>{item.question}</h3>
              <span className="faq-icon">
                {activeIndex === index ? '−' : '+'}
              </span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;