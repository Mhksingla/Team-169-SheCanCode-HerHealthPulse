"use client";
import React, { useState, useEffect } from "react";
import { db, auth } from "../utils/firebaseNotes";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Push from "push.js";
import { motion } from "framer-motion";

export default function PCODTracker() {
  const [user, setUser] = useState(null);
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [pastRecords, setPastRecords] = useState([]);
  const [cycleData, setCycleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nextPeriodDate, setNextPeriodDate] = useState(null);
  const symptomOptions = ["Cramps", "Mood Swings", "Headaches", "Fatigue"];

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPastRecords(currentUser.uid);
      } else {
        setUser(null);
        setPastRecords([]);
        setCycleData([]);
      }
    });
  }, []);

  const fetchPastRecords = async (userId) => {
    const q = query(collection(db, "users", userId, "pcodTracker"));
    const querySnapshot = await getDocs(q);
    const records = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPastRecords(records);
    setCycleData(
      records.map((rec) => ({
        name: rec.periodStart,
        cycleLength: calculateCycleLength(rec.periodStart, rec.periodEnd),
      }))
    );

    calculateNextPeriod(records);
  };

  const calculateCycleLength = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const calculateNextPeriod = (records) => {
    if (records.length > 0) {
      const lastRecord = records[records.length - 1];
      const lastPeriodDate = new Date(lastRecord.periodStart);
      const nextPeriod = new Date(lastPeriodDate);
      nextPeriod.setDate(nextPeriod.getDate() + 28);
      setNextPeriodDate(nextPeriod);

      const today = new Date();
      const daysLeft = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

      if (daysLeft <= 3) {
        Push.create("Reminder", {
          body: `Your next period is expected in ${daysLeft} days.`,
          icon: "/notification-icon.png",
          timeout: 4000,
          onClick: function () {
            window.focus();
            this.close();
          },
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please sign in to track your period.");

    const newEntry = { periodStart, periodEnd, symptoms, date: new Date() };
    await addDoc(collection(db, "users", user.uid, "pcodTracker"), newEntry);
    alert("Data saved successfully!");

    setPeriodStart("");
    setPeriodEnd("");
    setSymptoms([]);
    fetchPastRecords(user.uid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-pink-700 text-center">
          PCOD Tracker
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Log your cycle and view upcoming dates.
        </p>

        {user ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Period Start */}
              <div>
                <label className="block text-gray-700">Period Start Date</label>
                <input
                  type="date"
                  value={periodStart}
                  onChange={(e) => setPeriodStart(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {/* Period End */}
              <div>
                <label className="block text-gray-700">Period End Date</label>
                <input
                  type="date"
                  value={periodEnd}
                  onChange={(e) => setPeriodEnd(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-gray-700">Symptoms</label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomOptions.map((symptom) => (
                    <label
                      key={symptom}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={symptoms.includes(symptom)}
                        onChange={(e) =>
                          setSymptoms((prev) =>
                            e.target.checked
                              ? [...prev, symptom]
                              : prev.filter((s) => s !== symptom)
                          )
                        }
                      />
                      <span>{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition transform hover:scale-105"
              >
                Save Entry
              </button>
            </form>

            {pastRecords.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Past Records
                </h3>
                <div className="mt-2 max-h-40 overflow-y-auto border p-4 rounded-lg bg-gray-50">
                  {pastRecords.map((record) => (
                    <div
                      key={record.id}
                      className="bg-white p-3 mb-2 rounded-lg shadow text-gray-700"
                    >
                      <p>
                        <strong>Start:</strong> {record.periodStart} |{" "}
                        <strong>End:</strong> {record.periodEnd}
                      </p>
                      <p>
                        <strong>Symptoms:</strong>{" "}
                        {record.symptoms.length > 0
                          ? record.symptoms.join(", ")
                          : "None"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar UI */}
            <div className="mt-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">
                Your Cycle Calendar
              </h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={({ date }) => {
                  const formattedDate = date.toISOString().split("T")[0];
                  return pastRecords.some(
                    (record) => record.periodStart === formattedDate
                  )
                    ? "bg-pink-500 text-white rounded-md"
                    : "";
                }}
                className="p-3 border rounded-lg shadow-lg"
              />
            </div>

            {/* Next Period Alert */}
            {nextPeriodDate && (
              <div className="mt-4 p-3 bg-pink-100 text-pink-700 text-center rounded-lg">
                Next Period Expected: {nextPeriodDate.toDateString()}
              </div>
            )}

            {/* Cycle Trend Visualization */}
            {cycleData.length > 1 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Cycle Trends
                </h3>
                <div className="w-full h-60 mt-4 bg-gray-50 p-4 rounded-lg shadow">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cycleData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="cycleLength"
                        stroke="#d53f8c"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-700">
            Please log in to track your cycle.
          </p>
        )}
      </motion.div>
    </div>
  );
}
