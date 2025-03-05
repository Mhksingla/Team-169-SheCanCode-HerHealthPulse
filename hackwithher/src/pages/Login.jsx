import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import "@fortawesome/fontawesome-free/css/all.min.css";


const firebaseConfig = {
  apiKey: "AIzaSyC1cMZu7E9fySxIeDVfWSUzMFTc4P6L32E",
  authDomain: "women-45b54.firebaseapp.com",
  projectId: "women-45b54",
  storageBucket: "women-45b54.firebasestorage.app",
  messagingSenderId: "764103586895",
  appId: "1:764103586895:web:d233988733bce23f38263a",
  measurementId: "G-PNV8M7QNKZ",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message); 
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-50 to-pink-100 relative overflow-hidden p-6">
      {}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-pink-200 opacity-20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {}
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center w-full max-w-md z-10 animate-popUp mt-16 border border-white/30">
        <h2 className="text-pink-500 text-2xl font-bold mb-5 drop-shadow-lg">Welcome!</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border border-white/40 rounded-full text-gray-200 bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 border border-white/40 rounded-full text-gray-200 bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 rounded-full transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 text-sm mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-pink-300 font-bold hover:underline">
            Sign up
          </a>
        </p>

        {}
        <div className="flex justify-center gap-5 mt-5">
          <div className="bg-white/20 p-3 border border-white/40 rounded-full cursor-pointer hover:bg-pink-500 hover:text-white transition">
            <i className="fab fa-google text-lg"></i>
          </div>
          <div className="bg-white/20 p-3 border border-white/40 rounded-full cursor-pointer hover:bg-pink-500 hover:text-white transition">
            <i className="fab fa-facebook text-lg"></i>
          </div>
          <div className="bg-white/20 p-3 border border-white/40 rounded-full cursor-pointer hover:bg-pink-500 hover:text-white transition">
            <i className="fab fa-twitter text-lg"></i>
          </div>
        </div>
      </div>

      {}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        @keyframes popUp {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-popUp {
          animation: popUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;