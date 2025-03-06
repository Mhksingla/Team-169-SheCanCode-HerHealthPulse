"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MensGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-2xl border border-pink-300"
      >
        <h2 className="text-4xl font-bold text-pink-600 text-center mb-4">
          Men’s Guide to Women’s Health
        </h2>
        <p className="text-gray-700 text-center mb-8 text-lg">
          Learn how to support and understand women during their menstrual cycle, PCOD, and mood swings.
        </p>

        {/* Sections */}
        <div className="space-y-8">
          {/* Blog Section */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-md border border-pink-200">
            <h3 className="text-2xl font-semibold text-pink-700 mb-2">📖 Informative Blogs</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><a href="/blogs/how-to-support-women" className="text-pink-600 hover:underline">How to Comfort Your Partner During Periods</a></li>
              <li><a href="/blogs/pcod-awareness" className="text-pink-600 hover:underline">Understanding PCOD: A Guide for Men</a></li>
              <li><a href="/blogs/mood-swings" className="text-pink-600 hover:underline">Dealing with Mood Swings Positively</a></li>
            </ul>
          </div>

          {/* Video Section */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-md border border-pink-200">
            <h3 className="text-2xl font-semibold text-pink-700 mb-4">🎥 Expert Videos</h3>
            <iframe
              className="w-full h-56 rounded-lg"
              src="https://www.youtube.com/embed/your-video-id"
              title="Menstrual Awareness Video"
              allowFullScreen
            ></iframe>
          </div>

          {/* Do’s & Don’ts Section */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-md border border-pink-200">
            <h3 className="text-2xl font-semibold text-pink-700 mb-4">✅ Do’s & ❌ Don’ts</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-600 font-semibold text-lg">Do’s</h4>
                <ul className="list-disc pl-4 text-gray-700 space-y-2">
                  <li>Be patient and understanding</li>
                  <li>Offer a hot water bag for cramps</li>
                  <li>Respect their space & emotions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-600 font-semibold text-lg">Don’ts</h4>
                <ul className="list-disc pl-4 text-gray-700 space-y-2">
                  <li>Don’t say “It’s just a mood swing”</li>
                  <li>Don’t make jokes about periods</li>
                  <li>Don’t ignore their discomfort</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pamper Her Guide Section */}
      <div className="w-full max-w-4xl mt-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white p-8 shadow-lg rounded-2xl border border-pink-300">
          <h2 className="text-4xl font-bold text-pink-600 text-center mb-4">💝 Pamper Her Guide</h2>
          <p className="text-gray-700 text-lg mb-4 text-center">Suggestions for men on how to pamper women during sensitive times:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Offer comfort items like chocolates, herbal teas, or a warm drink.</li>
            <li>Plan a relaxing evening with light activities like watching a favorite movie or taking a walk.</li>
            <li>Give her space when she needs it but let her know you're there for support.</li>
            <li>Provide emotional support by listening and being empathetic.</li>
            <li>Encourage self-care activities like a warm bath, meditation, or light exercise.</li>
            <li>Help with chores or responsibilities to reduce her stress.</li>
            <li>Surprise her with a heartfelt note or small thoughtful gifts.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}