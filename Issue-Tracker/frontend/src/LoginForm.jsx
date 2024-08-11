import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import axios from 'axios';

function LoginForm() {
  // const [jokes, setJokes] = useState([]);
  const [formData, setFormData] = useState({
    email: 'tanmay.chavan@walchandsangli.ac.in',
    userid: '',
    password: '',
  });

  // useEffect(() => {
  //   axios.get('/api/jokes')
  //     .then((response) => {
  //       setJokes(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []); 

  const navigateToAboutPage = () => {
    
    window.location.href = '/issue-history';
   
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try{
      const res = await axios.post('http://localhost:8000/api/v1/users/login',{
        email:formData.email, username:formData.userid, password:formData.password
      },{withCredentials:true});

      if(res.data.statusCode == 200){
        console.log("Success ")
        navigateToAboutPage();
      }else{
        console.log("Error");
      }

    }catch(e){
      console.log(e);
      alert(e);
    }
    
  };

  return (
    <>
      <div className="login-form-container">
        <h1>Issue Tracker</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="userid"
            placeholder="User Id"
            value={formData.userid}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      
      {/* {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))} */}
    </>
  );
}

export default LoginForm;