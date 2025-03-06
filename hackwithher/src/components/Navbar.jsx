import { useState } from "react";
import { FaSearch, FaUserCircle, FaChevronDown } from "react-icons/fa";
import LOGO from "../assets/doctor3-removebg-preview.png";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMensDropdownOpen, setIsMensDropdownOpen] = useState(false);

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
        <div className="flex gap-5 relative">
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
            Govt. Schemes
          </a>

       
          <div className="relative">
            <button
              onClick={() => setIsMensDropdownOpen(!isMensDropdownOpen)}
              className="text-white text-sm font-bold flex items-center gap-1"
            >
              Men's Awareness <FaChevronDown />
            </button>
            {isMensDropdownOpen && (
              <div className="absolute bg-white text-pink-500 w-48 mt-2 rounded-lg shadow-lg z-10">
                <a href="/supportwomen" className="block px-4 py-2 hover:bg-pink-100">
                  How to Support Women & How to Pamper
                </a>
                <a href="/dosdonts" className="block px-4 py-2 hover:bg-pink-100">
                Couple/Family Support Forum
                </a>
                <a href="/understandingpcod" className="block px-4 py-2 hover:bg-pink-100">
                Quiz & Awareness Challenges
                </a>
                <a href="/workshops" className="block px-4 py-2 hover:bg-pink-100">
                "Menstrual Awareness Workshops"
                </a>
              </div>
            )}
          </div>
        </div>
      )}

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
