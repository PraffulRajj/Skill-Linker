import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-secondary mb-4">
          SkillLinker 2.0
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Services in 10 Minutes. Guaranteed.
        </p>
        <div className="space-x-4">
          <Link to="/login" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition duration-300">
            Login
          </Link>
          <Link to="/register" className="bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition duration-300">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
