import React, { useState, useEffect } from "react";

export default function SymptomTracker() {
  const [moods, setMoods] = useState(
    () => JSON.parse(localStorage.getItem("moods")) || []
  );
  const [selectedMood, setSelectedMood] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPeriodMood, setIsPeriodMood] = useState(false); 

  const moodColors = {
    "😊": "bg-yellow-400",
    "😢": "bg-blue-500",
    "😡": "bg-red-500",
    "😌": "bg-green-500",
    "😴": "bg-purple-500",
  };

  const moodRecommendations = {
    "😊": {
      audio: "/flute.mp3", 
      food: ["Fruits 🍉", "Dark Chocolate 🍫", "Nuts 🥜"],
      periodRecommendation: "Enjoy light exercises like yoga or a walk in nature to maintain your positive mood.",
    },
    "😢": {
      audio: "/flute.mp3", 
      food: ["Bananas �", "Oatmeal 🥣", "Tea ☕"],
      periodRecommendation: "Take a warm bath, practice deep breathing, and allow yourself to rest.",
    },
    "😡": {
      audio: "/flute.mp3", 
      food: ["Green Tea 🍵", "Salmon 🐟", "Avocado 🥑"],
      periodRecommendation: "Try journaling or mindfulness meditation to process your emotions.",
    },
    "😌": {
      audio: "/sound3.mp3", 
      food: ["Herbal Tea 🌿", "Yogurt 🍦", "Almonds 🌰"],
      periodRecommendation: "Maintain your calm with gentle stretching or a cup of herbal tea.",
    },
    "😴": {
      audio: "/sound1.mp3", 
      food: ["Warm Milk 🥛", "Chamomile Tea 🍵", "Honey 🍯"],
      periodRecommendation: "Get extra rest, and consider a short nap or a warm drink before bed.",
    },
  };

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  const addMood = () => {
    const mood = document.getElementById("moodSelect").value;
    const today = new Date().toISOString().split("T")[0];
    setMoods((prevMoods) => [
      ...prevMoods,
      { date: today, mood, isPeriodMood }, 
    ]);
    setSelectedMood(mood);
    setShowModal(true); 
  };

  const moodCounts = moods.reduce((acc, entry) => {
    const key = entry.isPeriodMood ? `${entry.mood}-period` : entry.mood;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl flex flex-col gap-8">
        {}
        <div className="space-y-6">
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="periodMood"
              checked={isPeriodMood}
              onChange={(e) => setIsPeriodMood(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="periodMood" className="text-gray-700">
              Is this a period-related mood swing?
            </label>
          </div>
          <button
            onClick={addMood}
            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition w-full shadow-md"
          >
            Add Mood
          </button>
        </div>

        {}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700">Mood Frequency</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            {Object.entries(moodCounts).map(([moodKey, count]) => {
              const [mood, isPeriod] = moodKey.split("-");
              return (
                <div key={moodKey} className="flex items-center mb-3">
                  <span className="text-xl w-10">{mood}</span>
                  {isPeriod && (
                    <span className="text-sm text-gray-500 ml-1">(Period)</span>
                  )}
                  <div
                    className={`h-6 ml-2 rounded-full ${moodColors[mood]}`}
                    style={{ width: `${count * 20}px` }}
                  ></div>
                  <span className="ml-2 text-gray-700">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {}
      {showModal && selectedMood && moodRecommendations[selectedMood] && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Suggestions for You
            </h2>
            <p className="text-gray-600 mb-4">
              🎧 Listen to this audio:
              <audio controls className="w-full mt-2">
                <source
                  src={moodRecommendations[selectedMood].audio}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </p>
            <p className="text-gray-600">
              🍽️ Try these foods:{" "}
              {moodRecommendations[selectedMood].food.join(", ")}
            </p>
            {isPeriodMood && (
              <p className="text-gray-600 mt-4">
                🌸 Period-specific tip:{" "}
                {moodRecommendations[selectedMood].periodRecommendation}
              </p>
            )}
            <button
              onClick={closeModal}
              className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition w-full shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}