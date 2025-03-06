"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const quizData = [
  {
    question: "What is the average length of a menstrual cycle?",
    options: ["21 days", "28 days", "35 days", "42 days"],
    answer: "28 days"
  },
  {
    question: "Which nutrient helps reduce menstrual cramps?",
    options: ["Calcium", "Iron", "Vitamin C", "Zinc"],
    answer: "Calcium"
  },
  {
    question: "What is PCOS?",
    options: [
      "A type of birth control",
      "A reproductive disorder",
      "A menstrual hygiene product",
      "A symptom of pregnancy"
    ],
    answer: "A reproductive disorder"
  },
  {
    question: "What are common symptoms of PCOS?",
    options: ["Irregular periods", "Hair loss", "Acne", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Why is menstrual health important?",
    options: [
      "It affects reproductive health",
      "It impacts overall well-being",
      "It helps in early detection of health issues",
      "All of the above"
    ],
    answer: "All of the above"
  }
];

export default function AwarenessQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-2xl border border-pink-300"
      >
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Men’s Awareness & Education
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Understanding women's health is crucial for a supportive and informed society.
          Take this quiz and explore key insights about menstrual health and related conditions.
        </p>
        {!showResult ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {quizData[currentQuestion].question}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg border-2 border-pink-500 text-pink-500 font-medium bg-white transition-all hover:bg-pink-500 hover:text-white ${
                    selectedOption
                      ? option === quizData[currentQuestion].answer
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-red-500 text-white border-red-500"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-4 text-gray-600">
              Question {currentQuestion + 1} of {quizData.length}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-pink-700">Quiz Completed!</h3>
            <p className="text-lg text-gray-700 mt-4">
              Your Score: <span className="font-bold text-pink-500">{score}/{quizData.length}</span>
            </p>
            <p className="mt-2 text-gray-600">
              Keep learning about women's health to be more supportive!
            </p>
            <button
              className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setSelectedOption(null);
              }}
            >
              Restart Quiz
            </button>
          </div>
        )}
      </motion.div>
      <div className="max-w-3xl mt-8 bg-white p-6 rounded-2xl shadow-md border border-pink-300">
        <h3 className="text-2xl font-semibold text-pink-600 mb-4">Did You Know?</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Menstrual health is directly linked to overall well-being and reproductive health.</li>
          <li>Supporting menstrual health conversations can break stigmas and empower women.</li>
          <li>Understanding PCOS and other conditions can help in early diagnosis and better support.</li>
        </ul>
      </div>
    </div>
  );
}
