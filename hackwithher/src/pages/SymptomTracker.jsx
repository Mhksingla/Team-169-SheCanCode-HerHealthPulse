import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SymptomTracker() {
  const [moods, setMoods] = useState(
    () => JSON.parse(localStorage.getItem("moods")) || []
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedMood, setSelectedMood] = useState("");

  const moodColors = {
    "😊": "bg-yellow-400",
    "😢": "bg-blue-500",
    "😡": "bg-red-500",
    "😌": "bg-green-500",
    "😴": "bg-purple-500",
  };

  const moodRecommendations = {
    "😊": {
      video: "https://www.youtube.com/watch?v=ZbZSe6N_BXs", // "Happy" - Pharrell Williams
      food: ["Fruits 🍉", "Dark Chocolate �", "Nuts 🥜"],
    },
    "😢": {
      video: "https://www.youtube.com/watch?v=IOBpdQCpP7U", // Relaxing music
      food: ["Bananas 🍌", "Oatmeal 🥣", "Tea ☕"],
    },
    "😡": {
      video: "https://www.youtube.com/watch?v=BOjDknlRQcA", // Calm meditation
      food: ["Green Tea 🍵", "Salmon 🐟", "Avocado 🥑"],
    },
    "😌": {
      video: "https://www.youtube.com/watch?v=2OEL4P1Rz04", // Peaceful music
      food: ["Herbal Tea 🌿", "Yogurt 🍦", "Almonds 🌰"],
    },
    "😴": {
      video: "https://www.youtube.com/watch?v=1ZYbU82GVz4", // Sleep meditation
      food: ["Warm Milk 🥛", "Chamomile Tea 🍵", "Honey 🍯"],
    },
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  const addMood = () => {
    const mood = document.getElementById("moodSelect").value;
    const today = new Date().toISOString().split("T")[0];
    setMoods((prevMoods) => [...prevMoods, { date: today, mood }]);
    setSelectedMood(mood);
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

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const weeks = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  };

  const weeks = generateCalendar(currentMonth, currentYear);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Track Your Mood</h2>
          <select
            id="moodSelect"
            className="border rounded-md p-3 w-full shadow-md"
          >
            {Object.keys(moodColors).map((mood) => (
              <option key={mood} value={mood}>
                {mood}{" "}
                {mood === "😊"
                  ? "Happy"
                  : mood === "😢"
                  ? "Sad"
                  : mood === "😡"
                  ? "Angry"
                  : mood === "😌"
                  ? "Calm"
                  : "Tired"}
              </option>
            ))}
          </select>
          <button
            onClick={addMood}
            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition w-full shadow-md"
          >
            Add Mood
          </button>

          {/* Mood Frequency Bar Chart */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700">Mood Frequency</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              {Object.entries(moodCounts).map(([mood, count]) => (
                <div key={mood} className="flex items-center mb-3">
                  <span className="text-xl w-10">{mood}</span>
                  <div
                    className={`h-6 ml-2 rounded-full ${moodColors[mood]}`}
                    style={{ width: `${count * 20}px` }}
                  ></div>
                  <span className="ml-2 text-gray-700">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mood-Based Recommendations */}
          {selectedMood && moodRecommendations[selectedMood] && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">
                Suggestions for You
              </h2>
              <p className="text-gray-600">
                🎥 Watch this:{" "}
                <a
                  href={moodRecommendations[selectedMood].video}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here
                </a>
              </p>
              <p className="text-gray-600">
                🍽️ Try these foods:{" "}
                {moodRecommendations[selectedMood].food.join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Right Section - Calendar */}
        <div className="flex-1 text-center">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-lg font-semibold mb-6">
            {Object.entries(moodCounts).map(([mood, count]) => (
              <div
                key={mood}
                className={`p-4 rounded-lg text-white ${moodColors[mood]} shadow-md`}
              >
                {mood} - {count}
              </div>
            ))}
          </div>
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