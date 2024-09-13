import React from 'react';
import Announcement from './Announcement';
import About from './About';
import InfoPage from './InfoPage';
import "./index.css";
import NavBar from './NavBar';
import PrayerTime from './PrayerTime';
import News from './News';
function App() {


    return (
        <>
            <NavBar/>
             <InfoPage/>
             <News/>
             <PrayerTime country="DZ" city="Algiers" />
             <About/>
             
            <Announcement  
            />
        </>
    );
}

export default App;

