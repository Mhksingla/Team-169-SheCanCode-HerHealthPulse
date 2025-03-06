import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import LOGO from "../assets/doctor3-removebg-preview.png";
import { getAuth, signOut } from "firebase/auth"; 
const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert("Signed out successfully!");
      window.location.reload(); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-pink-500 p-4 flex items-center justify-between gap-3">
      <img src={LOGO} alt="Logo" className="w-20 h-16 rounded-md" />
      {user && (
        <div className="flex gap-5">
          <a href="/periodashboard" className="text-white text-sm font-bold">
            Period Dashboard
          </a>
          <a href="/periodeducation" className="text-white text-sm font-bold">
            Period Education
          </a>
          <a href="/symptomtracker" className="text-white text-sm font-bold">
            Symptom Tracker
          </a>
          <a href="/resource" className="text-white text-sm font-bold">
            Resources
          </a>          
          <a href="/pcodtracker" className="text-white text-sm font-bold">
            PCOD Tracker
          </a>
          <a href="/govtschemes" className="text-white text-sm font-bold">
            Govt.Schemes
          </a>
        </div>
      )}

      <div className="flex items-center bg-white rounded-full p-2 shadow-md transition-all">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none px-3 py-1 rounded-full w-64 text-pink-500 placeholder-pink-300 focus:w-72 focus:bg-pink-100 transition-all"
        />
        <FaSearch className="text-pink-500 ml-2 cursor-pointer hover:text-pink-700 transition-colors" />
      </div>

      {user && (
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle className="text-white text-2xl" />
            <span className="text-white text-lg font-bold">
              Hi, {user.email.split("@")[0]}
            </span>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-left text-pink-500 hover:bg-pink-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;