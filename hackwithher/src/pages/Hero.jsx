import React, { useState } from "react";
import DOC1 from "../assets/doctor.jpg";
import DOC2 from "../assets/doctor2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faBrain,
  faUsers,
  faStethoscope,
  faPills,
  faBaby,
  faTint,
  faDumbbell,
  faBed,
  faAppleAlt,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { db, collection, addDoc } from "../utils/firebaseNotes";

const Hero = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    subject: "Select a subject",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Add message to Firestore
      await addDoc(collection(db, "contactMessages"), formData);
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "General Inquiry",
        subject: "Select a subject",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrorMessage("Failed to send your message. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="font-poppins bg-white text-center text-gray-900">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 bg-gradient-to-r from-pink-50 to-white">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 md:max-w-[50%] text-left"
          >
            <h1 className="text-5xl font-extrabold text-pink-700 leading-tight">
              Empowering Women's Health
            </h1>
            <p className="text-lg mt-4 text-gray-700 leading-relaxed">
              Your trusted source for women's healthcare, wellness, and expert
              advice. Stay informed and take charge of your well-being.
            </p>{" "}
            <br />
            <br />
            {/* Conditionally render the "Get Started" button */}
            {!user && (
              <Link
                to="/login"
                className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
              >
                Get Started
              </Link>
            )}
          </motion.div>

          {/* Right - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center items-center gap-5 mt-10 md:mt-0"
          >
            <div className="relative w-1/2 max-w-xs">
              <img
                src={DOC1}
                alt="Doctor 1"
                className="rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
              />
              <div className="absolute inset-0 bg-pink-500 opacity-10 rounded-xl"></div>
            </div>
            <div className="relative w-1/2 max-w-xs">
              <img
                src={DOC2}
                alt="Doctor 2"
                className="rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
              />
              <div className="absolute inset-0 bg-pink-500 opacity-10 rounded-xl"></div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          {/* Section Heading */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-pink-700">
              Comprehensive Women’s Wellness
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Explore expert-backed resources tailored to support every aspect
              of women's health and well-being.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
            {[
              {
                icon: faHeartbeat,
                title: "Menstrual Health",
                desc: "Track cycles, get insights, and manage symptoms.",
              },
              {
                icon: faBrain,
                title: "Mental Well-being",
                desc: "Access expert advice on stress, anxiety, and self-care.",
              },
              {
                icon: faUsers,
                title: "Community Support",
                desc: "Join discussions and support groups for women.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white shadow-lg text-center transition-transform transform hover:scale-105"
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-5xl text-pink-500 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-pink-50">
          {/* Section Heading */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-pink-700">Our Services</h2>
            <p className="text-lg text-gray-600 mt-3">
              Providing expert healthcare solutions tailored to women's unique
              needs.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
            {[
              {
                icon: faStethoscope,
                title: "Doctor Consultations",
                desc: "Book appointments with women's health experts.",
              },
              {
                icon: faPills,
                title: "Medication & Supplements",
                desc: "Order essential medicines and vitamins online.",
              },
              {
                icon: faBaby,
                title: "Pregnancy Care",
                desc: "Track pregnancy and get personalized guidance.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white shadow-lg text-center transition-transform transform hover:scale-105"
              >
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-5xl text-pink-500 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wellness Tips Section */}
        <section className="py-16 bg-pink-50">
          {/* Section Heading */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-pink-700">
              Daily Wellness Routine
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Adopt these simple yet powerful habits for a healthier mind and
              body.
            </p>
          </div>

          {/* Step-by-Step Wellness Guide */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="border-l-4 border-pink-500 absolute h-full left-1/2 transform -translate-x-1/2"></div>

            {[
              {
                icon: faTint,
                title: "Morning Hydration",
                desc: "Start your day with a glass of warm water for better digestion and energy.",
              },
              {
                icon: faAppleAlt,
                title: "Healthy Breakfast",
                desc: "Nourish your body with a balanced meal rich in proteins and vitamins.",
              },
              {
                icon: faDumbbell,
                title: "Midday Exercise",
                desc: "Engage in yoga, cardio, or light workouts to refresh your mind.",
              },
              {
                icon: faSmile,
                title: "Mental Wellness",
                desc: "Take breaks, practice mindfulness, and enjoy moments of gratitude.",
              },
              {
                icon: faBed,
                title: "Quality Sleep",
                desc: "Unwind with meditation or reading for a peaceful night’s sleep.",
              },
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex items-center w-full mb-12 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Left-aligned Cards */}
                {index % 2 === 0 ? (
                  <>
                    <div className="bg-pink-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                      <FontAwesomeIcon icon={tip.icon} className="text-2xl" />
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg max-w-sm w-full ml-6 transition-transform transform hover:scale-105">
                      <h3 className="text-xl font-semibold text-pink-700">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{tip.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white shadow-lg p-6 rounded-lg max-w-sm w-full mr-6 transition-transform transform hover:scale-105">
                      <h3 className="text-xl font-semibold text-pink-700">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{tip.desc}</p>
                    </div>
                    <div className="bg-pink-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                      <FontAwesomeIcon icon={tip.icon} className="text-2xl" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start justify-between">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 text-left"
            >
              <h2 className="text-4xl font-bold text-pink-700">Contact Us</h2>
              <p className="text-lg mt-4 text-gray-700">
                Have any questions? Fill out the form, and we’ll get back to you
                as soon as possible.
              </p>
              <button className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-700 transition">
                Contact Support
              </button>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 mt-10 lg:mt-0 bg-white p-8 shadow-xl rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Send Us a Message
              </h3>

              {successMessage && (
                <p className="text-green-600 font-medium mb-3">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-red-600 font-medium mb-3">{errorMessage}</p>
              )}

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-gray-700 font-medium">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing & Payments</option>
                    <option>Feedback & Suggestions</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    <option>Select a subject</option>
                    <option>Appointment Booking</option>
                    <option>Product Inquiry</option>
                    <option>Service Request</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message Box */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition transform hover:scale-105"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
