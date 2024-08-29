import React from 'react';
import { useNavigate } from 'react-router-dom';
import './error.css'; 
import Exploroerror from '../../assets/image/error.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/login'); 
  };

  return (
    <div className="not-found-container">
      <div className="">
        <h2 className="not-found-subtitle">Oops! The page you're looking for doesn't exist.</h2>
        <p className="not-found-text">It looks like you might be lost. Let's get you back on track!</p>
        <button className="not-found-button" onClick={handleGoBack}>
          Back to Home
        </button>
      </div>
      <div className="not-found-image-container">
        <img 
          src={Exploroerror} 
          alt="Lost traveler" 
          className="not-found-image" 
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
