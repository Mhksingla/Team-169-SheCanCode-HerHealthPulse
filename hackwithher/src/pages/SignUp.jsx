import React, { useState } from "react";
import { auth } from "../utils/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User created:", userCredential.user);

     
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message); 
    }
  };

  return (
    <>
      {}
      <style>
        {`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes floatShape {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
          }

          .animate-gradient-shift {
            background: linear-gradient(135deg, #ff9a9e, #fad0c4);
            background-size: 200% 200%;
            animation: gradientShift 10s ease infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .shape {
            position: absolute;
            opacity: 0.3;
            animation: floatShape 8s ease-in-out infinite;
          }

          .circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(255, 107, 107, 0.3);
          }

          .triangle {
            width: 0;
            height: 0;
            border-left: 80px solid transparent;
            border-right: 80px solid transparent;
            border-bottom: 140px solid rgba(255, 159, 67, 0.3);
          }

          .square {
            width: 120px;
            height: 120px;
            background: rgba(77, 182, 172, 0.3);
            transform: rotate(45deg);
          }
        `}
      </style>

      {}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 relative overflow-hidden">
        {}
        <div className="absolute inset-0 animate-gradient-shift"></div>

        {}
        <div className="shape circle top-20 left-10"></div>
        <div className="shape triangle top-40 right-20"></div>
        <div className="shape square bottom-20 left-1/4"></div>
        <div className="shape circle bottom-10 right-10"></div>

        {}
        <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-xl text-center w-full max-w-md z-10 animate-float">
          <h2 className="text-2xl font-bold text-pink-600 mb-5">Create an Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-pink-700 transition-colors"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 font-bold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}