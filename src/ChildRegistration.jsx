import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChildRegistration = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [fatherPhone, setFatherPhone] = useState('');
  const [motherPhone, setMotherPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [pdfFiles, setPdfFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');

  // Retrieve token when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    console.log('Retrieved Token:', storedToken); // Debug log
    if (storedToken) {
      setToken(storedToken);
    } else {
      setErrorMessage('No token found. Please log in again.');
    }
  }, []);

  const handleFileChange = (e) => {
    setPdfFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Ensure exactly 3 PDF files are selected
    if (pdfFiles.length !== 3) {
      setErrorMessage('Exactly 3 PDF files are required.');
      return;
    }

    // Format birthdate to yyyy-mm-dd
    const [year, month, day] = birthdate.split('-');
    const formattedBirthdate = `${year}-${month}-${day}`;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('address', address);
    formData.append('father_phone', fatherPhone);
    formData.append('mother_phone', motherPhone);
    formData.append('birthdate', formattedBirthdate); // Use formatted date

    pdfFiles.forEach((file) => {
      formData.append('pdf_files', file);
    });

    try {
      const response = await axios.post(
        'https://mohannednes.pythonanywhere.com/quran_school/register',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className='h1fo'>Register a Child</h1>
      <form onSubmit={handleSubmit}>
        <div className="segment">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fatherPhone">Father's Phone:</label>
            <input
              type="text"
              id="fatherPhone"
              value={fatherPhone}
              onChange={(e) => setFatherPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="motherPhone">Mother's Phone:</label>
            <input
              type="text"
              id="motherPhone"
              value={motherPhone}
              onChange={(e) => setMotherPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pdfFiles">Upload 3 PDF Files:</label>
            <input
              type="file"
              id="pdfFiles"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button type="submit" className="submit-button">Register Child</button>
        </div>
      </form>
    </div>
  );
};

export default ChildRegistration;
