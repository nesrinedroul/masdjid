import React from 'react';
import './index.css';

const Popup = ({onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>check out our events</h2>
       <h3>
        we re hosting events for your application
       </h3>
      </div>
    </div>
  );
};

export default Popup;
