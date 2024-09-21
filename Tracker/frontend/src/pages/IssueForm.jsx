import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import '../styles/IssueForm.css';
import Header from './Header';

function IssueForm () {

  const [formData, setFormData] = useState({
    issue: '',
    description: '',
    address: '',
    requireDepartment: '',
  });

  const navigateToAboutPage = () => {
    window.location.href = '/issue-history';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/v1/users/raise-issue', formData,{withCredentials:true})
    navigateToAboutPage();
  };

  return (
    <div className="issue-form-container">
      <Header/>
      
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="issue-form">
          <input
            type="text"
            name="issue"
            placeholder="Issue"
            value={formData.issue}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <select value={formData.requireDepartment} onChange={handleChange} name="requireDepartment">
                <option>Select an Department</option>
                <option>Software</option>
                <option>Electrician</option>
            </select>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      
    </div>
  );
};

export default IssueForm;
