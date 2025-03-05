import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PeriodCalendar() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [savedDates, setSavedDates] = useState([]);

  useEffect(() => {
    const storedDates = JSON.parse(localStorage.getItem("periodDates")) || [];
    setSavedDates(storedDates);
    checkUpcomingPeriod();
  }, [date]);

  useEffect(() => {
    checkTodayPeriodMessage();
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOffset = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());

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

  const changeMonth = (offset) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + offset, 1));
  };

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

  const checkUpcomingPeriod = () => {
    if (savedDates.length > 0) {
      const lastSaved = savedDates[savedDates.length - 1];
      if (date.getMonth() !== lastSaved.month) {
        alert(`🌸 Your period might be around ${lastSaved.firstDay}-${lastSaved.lastDay} this month! Take care! 💖`);
      }
    }
  };

  const checkTodayPeriodMessage = () => {
    const storedDates = JSON.parse(localStorage.getItem("periodDates")) || [];
    if (storedDates.length > 0) {
      const lastSaved = storedDates[storedDates.length - 1];
      const today = new Date().getDate();
      const month = new Date().getMonth();

      if (month !== lastSaved.month) {
        if (today >= lastSaved.firstDay && today <= lastSaved.lastDay) {
          const messages = [
            "💖 Take some rest, drink warm tea, and pamper yourself today!",
            "🌸 A warm bath and a good book can make you feel better!",
            "💪 You are strong! Stay hydrated and take things slow today.",
            "😊 Your comfort matters! Snuggle up with a cozy blanket and a movie.",
            "✨ Treat yourself today – you deserve some extra love and care!"
          ];
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          alert(randomMessage);
        }
      }
    }
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

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <div className="flex-1 text-left">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Track Your Period</h1>
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
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="bg-pink-50 p-6 rounded-lg shadow-md w-full max-w-sm text-center">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => changeMonth(-1)} className="text-pink-600 text-2xl">⬅</button>
              <h2 className="text-xl font-bold text-pink-600">{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h2>
              <button onClick={() => changeMonth(1)} className="text-pink-600 text-2xl">➡</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-pink-600 font-semibold">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {[...Array(firstDayOffset)].map((_, index) => (
                <div key={index} className="invisible">.</div>
              ))}
              {[...Array(daysInMonth)].map((_, day) => {
                const currentDay = day + 1;
                const isSelected = currentDay === firstDay || currentDay === lastDay;
                const isInRange = firstDay && lastDay && currentDay > firstDay && currentDay < lastDay;
                return (
                  <button
                    key={currentDay}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-pink-600 font-semibold cursor-pointer transition-all 
                      ${isSelected ? "bg-pink-600 text-white" : "bg-white"} 
                      ${isInRange ? "bg-pink-300 text-white" : "hover:bg-pink-200"}`}
                    onClick={() => handleDayClick(currentDay)}
                  >
                    {currentDay}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
