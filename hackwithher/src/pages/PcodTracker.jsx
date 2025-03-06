"use client";
import React, { useState, useEffect } from "react";
import { db, auth } from "../utils/firebaseNotes";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaSmile,
  FaTint,
  FaWeight,
  FaHeartbeat,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function PCODTracker() {
  const [user, setUser] = useState(null);
  const [isPCODDetected, setIsPCODDetected] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(true); // Show quiz only once
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if quiz is completed

  // PCOD Symptoms and Questions
  const pcodQuizQuestions = [
    {
      question: "Do you experience irregular periods?",
      key: "irregularPeriods",
      weight: 2, // Higher weight for critical symptoms
      icon: <FaCalendarAlt className="text-pink-500" />,
    },
    {
      question: "What is the average length of your menstrual cycle?",
      key: "cycleLength",
      options: ["Less than 21 days", "21-35 days", "More than 35 days"],
      weight: 2,
      icon: <FaCalendarAlt className="text-pink-500" />,
    },
    {
      question: "How long does your period usually last?",
      key: "periodDuration",
      options: ["Less than 2 days", "3-7 days", "More than 7 days"],
      weight: 1,
      icon: <FaTint className="text-pink-500" />,
    },
    {
      question: "Do you have excessive hair growth on face or body?",
      key: "excessiveHairGrowth",
      weight: 2,
      icon: <FaSmile className="text-pink-500" />,
    },
    {
      question: "Do you experience excessive hair fall?",
      key: "hairFall",
      weight: 1,
      icon: <FaSmile className="text-pink-500" />,
    },
    {
      question: "Do you have persistent acne?",
      key: "acne",
      weight: 1,
      icon: <FaSmile className="text-pink-500" />,
    },
    {
      question: "Have you noticed unusual weight gain?",
      key: "weightGain",
      weight: 1,
      icon: <FaWeight className="text-pink-500" />,
    },
    {
      question: "Do you experience mood swings or depression?",
      key: "moodSwings",
      weight: 1,
      icon: <FaHeartbeat className="text-pink-500" />,
    },
    {
      question: "Do you have difficulty losing weight?",
      key: "weightLossDifficulty",
      weight: 1,
      icon: <FaWeight className="text-pink-500" />,
    },
    {
      question: "Do you experience fatigue or low energy levels?",
      key: "fatigue",
      weight: 1,
      icon: <FaHeartbeat className="text-pink-500" />,
    },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleQuizAnswer = (questionKey, answer) => {
    setQuizAnswers((prev) => ({ ...prev, [questionKey]: answer }));
  };

  const evaluatePCOD = () => {
    let totalRiskScore = 0;

    // Calculate risk score based on quiz answers
    pcodQuizQuestions.forEach((question) => {
      const answer = quizAnswers[question.key];

      if (question.options) {
        // Handle multiple-choice questions
        if (answer === "Less than 21 days" || answer === "More than 35 days") {
          totalRiskScore += question.weight; // Irregular cycle length
        }
        if (answer === "Less than 2 days" || answer === "More than 7 days") {
          totalRiskScore += question.weight; // Irregular period duration
        }
      } else if (answer === "yes") {
        // Handle yes/no questions
        totalRiskScore += question.weight;
      }
    });

    // PCOD detection logic
    if (totalRiskScore >= 6) {
      setIsPCODDetected(true);
    } else {
      setIsPCODDetected(false);
    }

    setQuizCompleted(true); // Mark quiz as completed
    setShowQuiz(false); // Hide quiz after submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-4">
          PCOD Tracker
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Assess your risk of PCOD with a quick quiz.
        </p>

        {user ? (
          <>
            {/* PCOD Quiz */}
            {showQuiz && !quizCompleted && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-pink-700">
                  PCOD Symptoms Quiz
                </h3>
                <div className="space-y-4">
                  {pcodQuizQuestions.map((question) => (
                    <div
                      key={question.key}
                      className="bg-pink-50 p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl text-pink-500">
                          {question.icon}
                        </div>
                        <p className="text-gray-700 font-medium">
                          {question.question}
                        </p>
                      </div>
                      {question.options ? (
                        <div className="flex flex-col space-y-2 mt-2 pl-10">
                          {question.options.map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                handleQuizAnswer(question.key, option)
                              }
                              className={`px-4 py-2 rounded-lg text-left ${
                                quizAnswers[question.key] === option
                                  ? "bg-pink-600 text-white"
                                  : "bg-white text-gray-700 border border-pink-200"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex space-x-4 mt-2 pl-10">
                          <button
                            onClick={() => handleQuizAnswer(question.key, "yes")}
                            className={`px-4 py-2 rounded-lg ${
                              quizAnswers[question.key] === "yes"
                                ? "bg-pink-600 text-white"
                                : "bg-white text-gray-700 border border-pink-200"
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleQuizAnswer(question.key, "no")}
                            className={`px-4 py-2 rounded-lg ${
                              quizAnswers[question.key] === "no"
                                ? "bg-pink-600 text-white"
                                : "bg-white text-gray-700 border border-pink-200"
                            }`}
                          >
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={evaluatePCOD}
                  className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition transform hover:scale-105"
                >
                  Submit Quiz
                </button>
              </div>
            )}

            {/* PCOD Suggestion */}
            {isPCODDetected && (
              <div className="mt-6 p-6 bg-pink-50 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-3xl text-pink-700" />
                  <h3 className="text-2xl font-bold text-pink-700">
                    PCOD Detected
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 mt-2">
                  Based on your responses, there is a potential indication of
                  PCOD. Here are some suggestions:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Consult a gynecologist for a detailed evaluation.</li>
                  <li>Maintain a balanced diet and regular exercise routine.</li>
                  <li>Monitor your symptoms and keep a detailed record.</li>
                  <li>
                    Consider lifestyle changes to manage stress and hormonal
                    balance.
                  </li>
                </ul>
              </div>
            )}

            {/* Quiz Completed but No PCOD Detected */}
            {quizCompleted && !isPCODDetected && (
              <div className="mt-6 p-6 bg-pink-50 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-3xl text-pink-700" />
                  <h3 className="text-2xl font-bold text-pink-700">
                    No PCOD Detected
                  </h3>
                </div>
                <p className="text-gray-700 mt-2">
                  Based on your responses, there is no strong indication of PCOD.
                  However, if you experience any symptoms in the future, consult
                  a doctor.
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-700">
            Please log in to assess your PCOD risk.
          </p>
        )}
      </motion.div>
    </div>
  );
}