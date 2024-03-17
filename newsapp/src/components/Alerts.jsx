// Alert.js

import React from 'react';
import './Alerts.css';

const Alert = ({ title, content, onClose }) => {
  return (
    <div className="containers">
      <div className="alert">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <h3>{content}</h3>
      </div>
    </div>
  );
}

export default Alert;
