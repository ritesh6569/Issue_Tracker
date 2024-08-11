import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handNavigate = (url) => {
    navigate(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-bold text-gray-800">
            Lipton Canteen Billing System
          </div>
          <div>
            <button
              onClick={() => {
                // handNavigate("LoginForm")
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
            >
              Login
            </button>
            <button
              onClick={()=>{
                // handNavigate("")
              }}
              className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300"
            >
              SignUp
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Lipton Canteen
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Our billing system is designed to streamline the process of managing
          orders and payments, providing an efficient and user-friendly
          experience for both staff and customers.
        </p>
        <div className="mt-8">
          <button
            onClick={()=>{
            //   handNavigate("/LoginForm")
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 mr-4 animate-bounce"
          >
            Get Started
          </button>
          <button
            onClick={()=>{
            //   handNavigate("")
            }}
            className="bg-gray-800 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300 animate-bounce"
          >
            Learn More
          </button>
        </div>
      </main>
      <footer className="bg-white shadow py-4">
        <div className="container mx-auto text-center text-gray-600">
          &copy; 2024 Lipton Canteen. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;