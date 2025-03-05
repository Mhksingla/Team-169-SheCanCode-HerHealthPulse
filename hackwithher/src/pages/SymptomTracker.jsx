import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SymptomTracker() {
  const [moods, setMoods] = useState(() => JSON.parse(localStorage.getItem("moods")) || []);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const moodColors = {
    "😊": "bg-yellow-400",
    "😢": "bg-blue-500",
    "😡": "bg-red-500",
    "😌": "bg-green-500",
    "😴": "bg-purple-500",
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  const addMood = () => {
    const mood = document.getElementById("moodSelect").value;
    const today = new Date().toISOString().split("T")[0];
    setMoods((prevMoods) => [...prevMoods, { date: today, mood }]);
  };

  const moodCounts = moods.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const changeMonth = (direction) => {
    setCurrentMonth((prev) => {
      let newMonth = prev + direction;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  // Function to get the days of the month
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Function to organize days into weeks
  const getWeeksInMonth = (month, year) => {
    const days = getDaysInMonth(month, year);
    const weeks = [];
    let week = [];

    // Fill the first week with empty days if necessary
    const firstDayOfWeek = days[0].getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(null);
    }

    days.forEach((day) => {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    });

    // Fill the last week with empty days if necessary
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  };

  const weeks = getWeeksInMonth(currentMonth, currentYear);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Track Your Mood</h2>
          <select id="moodSelect" className="border rounded-md p-3 w-full shadow-md">
            <option value="😊">😊 Happy</option>
            <option value="😢">😢 Sad</option>
            <option value="😡">😡 Angry</option>
            <option value="😌">😌 Calm</option>
            <option value="😴">😴 Tired</option>
          </select>
          <button
            onClick={addMood}
            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition w-full shadow-md"
          >
            Add Mood
          </button>

          {}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700">Mood Frequency</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              {Object.entries(moodCounts).map(([mood, count]) => (
                <div key={mood} className="flex items-center mb-3">
                  <span className="text-xl w-10">{mood}</span>
                  <div className={`h-6 ml-2 rounded-full ${moodColors[mood]}`} style={{ width: `${count * 20}px` }}></div>
                  <span className="ml-2 text-gray-700">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="flex-1 text-center">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => changeMonth(-1)} className="text-gray-600 hover:text-gray-800">
              <FaChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={() => changeMonth(1)} className="text-gray-600 hover:text-gray-800">
              <FaChevronRight size={24} />
            </button>
          </div>

          {}
          <div className="grid grid-cols-3 gap-4 text-lg font-semibold mb-6">
            {Object.entries(moodCounts).map(([mood, count]) => (
              <div key={mood} className={`p-4 rounded-lg text-white ${moodColors[mood]} shadow-md`}>{mood} - {count}</div>
            ))}
          </div>

          {}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-sm font-bold text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-2">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`p-2 rounded-md text-center ${
                      day ? "bg-white hover:bg-pink-100 cursor-pointer" : "bg-transparent"
                    }`}
                  >
                    {day ? day.getDate() : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}