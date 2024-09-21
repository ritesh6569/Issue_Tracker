import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import axios from 'axios';
import "../styles/Header.css";


function Header(){

    const [adminId,setAdminId] = useState();

    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:8000/api/v1/users/get-admin',{withCredentials:true})
        .then((response) => {
          setAdminId(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const handleReport = (e) => {
      e.preventDefault();
      window.location.href = '/reports';
    }

    const handleLogOut = async (e) => {
        try {
          await axios.post('http://localhost:8000/api/v1/users/logout',{}, { withCredentials: true });
        } catch (error) {
          console.error('Error completing the task:', error);
        }
        sessionStorage.clear();
        localStorage.clear();

        history.back();  
        history.forward();
        window.onpopstate = function ()
        {
          history.go(1);
        };
          
        navigate("/login");
      };
    
    return(
        <>
            <header className="header">
                <h1>ISSUE TRACKER</h1>
                <div className='header-a'>
                
                <a className="logout-button" href='/issue-history'>Problems History</a>
                <a className="logout-button" href='/issue-form' >Report a Problem</a>
                {adminId === "Admin" && (
                  <button className="logout-button" onClick={handleReport}>Reports</button>
                )}
                <button className="logout-button" onClick={handleLogOut}>Log out</button>
                </div>
                
            </header>
        </>
    );
}

export default Header