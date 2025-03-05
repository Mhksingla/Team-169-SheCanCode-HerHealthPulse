import React from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Menstrual Cycle",
    items: [
      { heading: "Menstrual Phase", text: "Uterus sheds its lining, causing bleeding." },
      { heading: "Follicular Phase", text: "Body prepares for ovulation by developing an egg." },
      { heading: "Ovulation", text: "Egg is released and can be fertilized." },
      { heading: "Luteal Phase", text: "If not fertilized, hormone levels drop." },
    ],
  },
  {
    title: "Symptoms & Self-Care",
    items: [
      { heading: "Menstrual Cramps", text: "Use a warm compress, gentle stretching, or pain relievers." },
      { heading: "Bloating", text: "Drink water and eat potassium-rich foods like bananas." },
      { heading: "Mood Swings", text: "Try relaxation techniques, exercise, or magnesium-rich foods." },
      { heading: "Headaches", text: "Stay hydrated, reduce caffeine, and try gentle yoga." },
    ],
  },
  {
    title: "Myth vs. Fact",
    items: [
      { heading: "❌ Myth:", text: "You shouldn't exercise during your period." },
      { heading: "✅ Fact:", text: "Light exercise can actually help with cramps!" },
      { heading: "❌ Myth:", text: "You can't get pregnant while on your period." },
      { heading: "✅ Fact:", text: "It is possible to conceive during menstruation, though it's less likely." },
      { heading: "❌ Myth:", text: "Periods should always be exactly 28 days long." },
      { heading: "✅ Fact:", text: "Cycle lengths vary between 21-35 days and are unique to each person." },
    ],
  },
];

const PeriodEducation = () => {
  return (
    <div className="min-h-screen bg-pink-100 py-12 px-4 md:px-12 text-gray-800">

      {/* Content */}
      <div className="pt-20 max-w-4xl mx-auto space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center bg-pink-600 text-white py-3 rounded-md mb-6">
              {section.title}
            </h1>
            <div className="space-y-6">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-lg shadow-md bg-pink-50 transition transform ${idx % 2 === 0 ? "hover:scale-105" : "hover:scale-100"}`}
                >
                  <h2 className="text-xl font-semibold text-pink-700">{item.heading}</h2>
                  <p className="text-gray-700 mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodEducation;
