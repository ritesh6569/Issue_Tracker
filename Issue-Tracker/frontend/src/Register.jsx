import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

function Register(){
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    phone: '',
    department: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const res = await axios.post('http://localhost:8000/api/v1/users/register',{
      fullName: formData.name,
      email:formData.email, username:formData.userId, password:formData.password,department:formData.department, phoneNumber:formData.phone
    },{withCredentials:true});
    console.log(res);
  };

  return (
    <div className="register-container">
      <h1>ISSUE TRACKER</h1>
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="userId" 
          placeholder="User ID" 
          value={formData.userId} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone No." 
          value={formData.phone} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="department" 
          placeholder="Department" 
          value={formData.department} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Register;
