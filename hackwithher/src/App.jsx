import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "../src/utils/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
import SymptomTracker from "./pages/SymptomTracker";
import PeriodDashboard from "./pages/PeriodDashboard";
import PeriodCalendar from "./pages/PeriodCalendar";
import CuteNotes from "./pages/Notes";
import PeriodEducation from "./pages/PeriodEducation";
import ResourcesPage from "./pages/Resource";
import Login from "./pages/Login";
import Chatbot from "./components/Chatbot";
import SignUp from "./pages/SignUp";
import PCODTracker from "./pages/PcodTracker";
import GovtSchemes from "./pages/GovtScheme";

const App = () => {
  const [user, setUser] = useState(null); // State to store user data

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user data if logged in
      } else {
        setUser(null); // Clear user data if logged out
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Navbar user={user} /> {/* Pass user data to Navbar */}
      <Routes>
        <Route path="/" element={<Hero user={user} />} />{" "}
        <Route
          path="/symptomtracker"
          element={<SymptomTracker />}
        />
        <Route
          path="/periodashboard"
          element={<PeriodDashboard />}
        />
        <Route
          path="/periodcalendar"
          element={<PeriodCalendar />}
        />
        <Route
          path="/notes"
          element={<CuteNotes />}
        />
        <Route
          path="/periodeducation"
          element={<PeriodEducation />}
        />
        <Route
          path="/resource"
          element={<ResourcesPage />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={<SignUp />}
        />
                <Route
          path="/pcodtracker"
          element={<PCODTracker />}
        />
                        <Route
          path="/govtschemes"
          element={<GovtSchemes />}
        />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
};

export default App;
