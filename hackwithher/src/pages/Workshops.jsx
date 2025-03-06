"use client";
import React from "react";
import { motion } from "framer-motion";

const workshops = [
  {
    title: "Understanding Menstrual Health",
    date: "March 15, 2025",
    location: "Community Center, Rajpura",
    description: "A session covering the basics of menstrual health, hygiene, and breaking taboos."
  },
  {
    title: "PCOS Awareness & Management",
    date: "March 22, 2025",
    location: "Health & Wellness Club, Chandigarh",
    description: "Experts discuss the causes, symptoms, and management strategies for PCOS."
  },
  {
    title: "Nutrition & Menstrual Health",
    date: "March 29, 2025",
    location: "Wellness Hub, Mohali",
    description: "A workshop focusing on diet, nutrition, and its impact on menstrual cycles."
  }
];

export default function MenstrualWorkshops() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-2xl border border-pink-300"
      >
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Menstrual Awareness Workshops
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Join our educational workshops to learn more about menstrual health, hygiene, and wellness.
        </p>
        <div className="space-y-6">
          {workshops.map((workshop, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white shadow-md rounded-xl border border-pink-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold text-pink-600">{workshop.title}</h3>
              <p className="text-gray-700 mt-2">📅 {workshop.date} | 📍 {workshop.location}</p>
              <p className="text-gray-600 mt-2">{workshop.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
