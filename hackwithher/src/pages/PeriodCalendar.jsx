import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PeriodCalendar() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [savedDates, setSavedDates] = useState([]);
  const [cycleLength, setCycleLength] = useState(null);
  const [conceive, setConceive] = useState(null);

  // Load saved dates from localStorage on component mount
  useEffect(() => {
    const storedDates = JSON.parse(localStorage.getItem("periodDates")) || [];
    setSavedDates(storedDates);
    if (storedDates.length > 1) {
      const lastCycle = storedDates[storedDates.length - 1];
      const prevCycle = storedDates[storedDates.length - 2];
      setCycleLength(lastCycle.firstDay - prevCycle.firstDay);
    }
  }, []);

  // Check for upcoming period
  useEffect(() => {
    checkUpcomingPeriod();
  }, [date]);

  // Check if today is within the period range
  useEffect(() => {
    checkTodayPeriodMessage();
  }, []);

  // Handle day selection
  const handleDayClick = (day) => {
    if (!firstDay) {
      setFirstDay(day);
      setLastDay(null);
    } else if (!lastDay && day > firstDay) {
      setLastDay(day);
    } else {
      setFirstDay(day);
      setLastDay(null);
    }
  };

  // Save selected dates to localStorage
  const saveDates = () => {
    if (firstDay && lastDay) {
      const newDates = [...savedDates, { month: date.getMonth(), firstDay, lastDay }];
      localStorage.setItem("periodDates", JSON.stringify(newDates));
      setSavedDates(newDates);
      alert("Your period dates have been saved! 😊");
    } else {
      alert("Please select both start and end dates before saving!");
    }
  };

  // Check for upcoming period and alert the user
  const checkUpcomingPeriod = () => {
    if (savedDates.length > 0) {
      const lastSaved = savedDates[savedDates.length - 1];
      if (date.getMonth() !== lastSaved.month) {
        alert(`🌸 Your period might be around ${lastSaved.firstDay}-${lastSaved.lastDay} this month! Take care! 💖`);
      }
    }
  };

  // Check if today is within the period range and alert the user
  const checkTodayPeriodMessage = () => {
    const storedDates = JSON.parse(localStorage.getItem("periodDates")) || [];
    if (storedDates.length > 0) {
      const lastSaved = storedDates[storedDates.length - 1];
      const today = new Date().getDate();
      const month = new Date().getMonth();
      if (month === lastSaved.month && today >= lastSaved.firstDay && today <= lastSaved.lastDay) {
        alert("💖 Take care, it's your period time!");
      }
    }
  };

  // Generate calendar days with correct alignment
  const generateCalendarDays = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // Format saved dates for display
  const formatSavedDates = () => {
    return savedDates
      .sort((a, b) => {
        const dateA = new Date(date.getFullYear(), a.month, a.firstDay);
        const dateB = new Date(date.getFullYear(), b.month, b.firstDay);
        return dateB - dateA; // Sort in descending order (latest first)
      })
      .map((entry, index) => {
        const monthName = new Date(date.getFullYear(), entry.month).toLocaleString("default", { month: "long" });
        return (
          <div key={index} className="text-gray-700 mb-2">
            {`${monthName} ${entry.firstDay} - ${entry.lastDay}, ${date.getFullYear()}`}
          </div>
        );
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6 relative">
      <button
        onClick={() => navigate("/periodashboard")}
        className="absolute top-5 left-5 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600"
      >
        ⬅ Back
      </button>
      <button
        onClick={() => navigate("/notes")}
        className="fixed bottom-5 right-5 bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-600"
      >
        📝 Cute Notes
      </button>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Track Your Period</h1>

        {/* Calendar Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section - Calendar */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={goToPreviousMonth}
                className="text-pink-600 hover:text-pink-800"
              >
                <FaChevronLeft size={24} />
              </button>
              <h2 className="text-xl font-bold text-pink-600">
                {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
              </h2>
              <button
                onClick={goToNextMonth}
                className="text-pink-600 hover:text-pink-800"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-bold text-pink-600">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={`p-2 text-center rounded-md cursor-pointer ${
                    day === null
                      ? "bg-transparent"
                      : (day === firstDay || day === lastDay)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 hover:bg-pink-200"
                  }`}
                  onClick={() => day !== null && handleDayClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="flex-1 text-left">
            <p className="text-gray-700 mb-2">First day of your period:</p>
            <input
              type="text"
              value={firstDay ? `${date.toLocaleString('default', { month: 'long' })} ${firstDay}, ${date.getFullYear()}` : "Select a date"}
              readOnly
              className="w-full p-2 border-2 border-pink-500 rounded-md mb-4"
            />
            <p className="text-gray-700 mb-2">Last day of your period:</p>
            <input
              type="text"
              value={lastDay ? `${date.toLocaleString('default', { month: 'long' })} ${lastDay}, ${date.getFullYear()}` : "Select a date"}
              readOnly
              className="w-full p-2 border-2 border-pink-500 rounded-md mb-4"
            />
            <button
              onClick={saveDates}
              className="bg-pink-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-pink-700"
            >
              💾 Save Dates
            </button>

            <h2 className="text-xl font-bold text-pink-600 mt-6">Do you want to conceive?</h2>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setConceive(true)}
                className={`px-4 py-2 rounded-md ${conceive === true ? "bg-green-600 text-white" : "bg-gray-300"}`}
              >
                Yes
              </button>
              <button
                onClick={() => setConceive(false)}
                className={`px-4 py-2 rounded-md ${conceive === false ? "bg-red-600 text-white" : "bg-gray-300"}`}
              >
                No
              </button>
            </div>
            {conceive && (
              <p className="mt-4 text-gray-700">
                To increase your chances of conceiving, track your ovulation days. Typically, ovulation occurs 14 days before your next period. Maintaining a healthy lifestyle and consulting a doctor can also help!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Saved Dates Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full mt-8">
        <h2 className="text-xl font-bold text-pink-600 mb-4">Saved Period Dates</h2>
        <div className="mt-2">
          {savedDates.length > 0 ? (
            formatSavedDates()
          ) : (
            <p className="text-gray-700">No saved dates yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}