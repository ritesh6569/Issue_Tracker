import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
import './IssueHistory.css';
import { useEffect } from 'react';
import axios from 'axios';


function IssueHistory(issues) {
  const [tasks, settasks] = useState([]);
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/get-issue-for-user',{withCredentials:true})
      .then((response) => {
        settasks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigateToAboutPage = () => {
    window.location.href = '/issue-form';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateToAboutPage();
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/v1/users/get-issue');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // Example: Fetch data from a backend API
  // axios.get('http://localhost:8000/api/v1/users/get-issue-for-user')
  // .then(response => {
  //   // Handle the response
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   // Handle any errors
  //   console.error('Error fetching data:', error);
  // });


  return (
    <>
      <div className="issue-history">
        <header className="header">
          <h1>ISSUE TRACKER</h1>
          <button className="logout-button">Log out</button>
        </header>
        <main>
          <section className="history-section">
            <h2>History</h2>
            <div className="issues-container">
              <div className="current-issues">
                <h3>Current Issues</h3>
                <div className='current-issues-info'>
                  <ol>
                  {tasks && tasks.length>0 && tasks.map((task) => (
                    <div key={task.id} >
                      <div className="tasks">
                        <h3>{task.issue}</h3>
                        <button>Completed</button>
                      </div>
                      
                      <p>{task.description}</p>
                    </div>
                  ))}
                </ol>
                </div>
              </div>
              <div className="tasks-to-resolve">
                <h3>Issues to Be Resolved</h3>
                <div className="tasks-to-resolve-info">
                  <ol>
                  {tasks && tasks.length>0 && tasks.map((task) => (
                    <div key={task.id}>
                      <h3>{task.issue}</h3>
                      <p>{task.description}</p>
                    </div>
                  ))}
                </ol> 
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <button className="report-issue-button" onClick={handleSubmit}>Report an issue</button>
        </footer>
      </div>
    </>
  );
};

export default IssueHistory;