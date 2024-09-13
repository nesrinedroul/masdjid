import React, { useState, useEffect } from "react";
import './index.css';  // Assuming the CSS is in this file

const PrayerTime = ({ country, city }) => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [dateInfo, setDateInfo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country && city) {
      fetchPrayerTimesByCity(country, city);
    } else { 
      fetchPrayerTimesByLocation();
    }
  }, [country, city]);

  const fetchPrayerTimesByLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        fetch(
          `https://api.aladhan.com/v1/calendar/${new Date().getFullYear()}?latitude=${latitude}&longitude=${longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            const prayerData = data.data[new Date().getDate() - 1];
            setPrayerTimes(prayerData.timings);
            setDateInfo(prayerData.date.gregorian);
          })
          .catch((err) => {
            setError("Failed to fetch prayer times.");
          });
      },
      (error) => {
        setError("Geolocation is not enabled or available.");
      }
    );
  };

  const fetchPrayerTimesByCity = (countryCode, cityName) => {
    fetch(
      `https://api.aladhan.com/v1/calendarByCity?country=${countryCode}&city=${cityName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const prayerData = data.data[new Date().getDate() - 1];
        setPrayerTimes(prayerData.timings);
        setDateInfo(prayerData.date.gregorian);
      })
      .catch((err) => {
        setError("Failed to fetch prayer times.");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="prayer-container">
      <h1 className="prayer-title">Prayer Timing</h1>
      <div className="prayer-content">
        <div className="prayer-image">
          <img src="prayer.jpg" alt="Prayer" />
        </div>
        <div className="prayer-timings">
          {dateInfo && (
            <p className="date-info">
              {dateInfo.weekday.en}, {dateInfo.month.en} {dateInfo.day}, {dateInfo.year}
            </p>
          )}
          <table>
            <thead>
              <tr>
                <th>Name Of Salat</th>
                <th>Azan Time</th>
                <th>Prayer Time</th>
              </tr>
            </thead>
            <tbody>
              {prayerTimes && (
                <>
                  <tr>
                    <td>Fajr</td>
                    <td>{prayerTimes.Fajr}</td>
                    <td>{prayerTimes.Fajr}</td>
                  </tr>
                  <tr>
                    <td>Dhuhr</td>
                    <td>{prayerTimes.Dhuhr}</td>
                    <td>{prayerTimes.Dhuhr}</td>
                  </tr>
                  <tr>
                    <td>Asr</td>
                    <td>{prayerTimes.Asr}</td>
                    <td>{prayerTimes.Asr}</td>
                  </tr>
                  <tr>
                    <td>Maghrib</td>
                    <td>{prayerTimes.Maghrib}</td>
                    <td>{prayerTimes.Maghrib}</td>
                  </tr>
                  <tr>
                    <td>Isha</td>
                    <td>{prayerTimes.Isha}</td>
                    <td>{prayerTimes.Isha}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrayerTime;


