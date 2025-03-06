import React from "react";
import { useNavigate } from "react-router-dom";
import LeftImage from "../assets/dash2.png";
import RightImage from "../assets/dash3.png";

export default function PeriodDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-50 flex flex-col items-center justify-center p-6 space-y-12 relative">
   
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-pink-600 text-white px-5 py-2 rounded-full text-lg shadow-lg transition-transform hover:scale-110"
      >
        ← Back
      </button>

    
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
       
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <img src={LeftImage} alt="Cycle Tracking" className="w-40 h-40 md:w-48 md:h-70 rounded-xl shadow-lg" />
        </div>

       
        <div className="text-center md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-4">
            Track Your Cycle with Ease
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Stay on top of your menstrual health with accurate predictions and insights, 
            designed to help you feel more confident and informed.
          </p>

         
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-pink-700">Accurate Predictions</h2>
              <p className="text-gray-600 mt-2">
                Get precise cycle forecasts based on smart tracking algorithms.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-pink-700">Personalized Insights</h2>
              <p className="text-gray-600 mt-2">
                Understand your body with custom health insights and reminders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-pink-700">Privacy First</h2>
              <p className="text-gray-600 mt-2">
                Your data stays secure with encrypted storage and private access.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-pink-700">Smart Notifications</h2>
              <p className="text-gray-600 mt-2">
                Get timely reminders for periods, ovulation, and wellness tips.
              </p>
            </div>
          </div>

         
          <a
            href="/periodcalendar"
            className="bg-pink-600 text-white py-4 px-8 rounded-full text-xl font-semibold shadow-lg transition-transform hover:scale-110 mt-8 inline-block"
          >
            Get Started
          </a>
        </div>

       
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <img src={RightImage} alt="Health Insights" className="w-40 h-40 md:w-48 md:h-55 rounded-xl shadow-lg" />
        </div>
      </div>
    </div>
  );
}