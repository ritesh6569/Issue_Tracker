import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import "../styles/Reports.css"

function Reports(issues) {
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/fetch-report',{withCredentials:true})
      .then((response) => {
        settasks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="reports-h">
        <Header/>

        <main>
          <section className="report-section">
            <h2>History</h2>
              <div className="tasks">
                <div className='current'>
                  <div className='pt'><h3 id="current">Problem</h3></div>
                  <div className="pt"><h3 id="current">Description</h3></div>
                  <div className="pt"><h3 id="current">Address</h3></div>
                  <div className="pt"><h3 id="current">Completed</h3></div>
                  <div className="pt"><h3 id="dept">Department</h3></div>
                  <div className="pt"><h3 id="current">Created Time</h3></div>
                  <div className="pt"><h3 id="current">Resolved Time</h3></div>
                </div>
      
                <div className='tasks-information'>
                  {tasks && tasks.length>0 && tasks.map((task,index) => (
                    <div key={task.id} className='reports-he'>
                        <div className='h'><p>{task.issue}</p></div>
                        <div className="td"><p>{task.description}</p></div>
                        <div className="td"><p>{task.address}</p></div>
                        <div className="td"><p>{task.complete?"Yes":"No"}</p></div>
                        <div className="td"><p>{task.requireDepartment}</p></div>
                        <div className="td"><p>{task.createdAt}</p></div>
                        <div className="td"><p>{task.updatedAt!=task.createdAt ? task.updatedAt: "-"}</p></div> 
                    </div>
                  ))}
                
                </div>
              </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Reports;

