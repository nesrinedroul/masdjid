import React from 'react';
import "./index.css";

function Announcement({ openLoginForm, openSalahTime }) {
    const handleCardClick = (destination) => {
        if (destination === 'login') {
            openLoginForm();
        } else if (destination === 'salah') {
            openSalahTime();
        }
    };

    return (
        <>
            <div className='announce-h1'>
                <h1>Important News</h1>
            </div> 
            <div className="announcement-container">
                <div 
                    className="announcement-card" 
                    onClick={() => handleCardClick('login')}>
                    <div className="icon-container">
                        <span className="material-symbols-outlined">
                            mosque
                        </span>
                    </div>
                    <h3>Qur'anic School</h3>
                </div>

                <div 
                    className="announcement-card" 
                    onClick={() => handleCardClick('salah')}>
                    <div className="icon-container">
                        <span className="material-symbols-outlined">
                            mosque
                        </span>
                    </div>
                    <h3>Salah Time</h3>
                </div>

                <div className="announcement-card">
                    <div className="icon-container">
                        <span className="material-symbols-outlined">
                            campaign
                        </span>
                    </div>
                    <h3>General Announcement</h3>
                </div>
            </div>
        </>
    );
}

export default Announcement;
