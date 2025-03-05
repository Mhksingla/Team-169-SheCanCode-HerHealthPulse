import { useState, useEffect } from "react";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Women's Health Guide",
      description: "Comprehensive articles on women's health topics, including mental wellness, nutrition, and fitness.",
      link: "#"
    },
    {
      title: "Emergency Helplines",
      description: "Find contact numbers for immediate medical assistance and mental health support.",
      link: "#"
    },
    {
      title: "Nutrition & Diet",
      description: "Healthy meal plans and dietary advice tailored for women at different life stages.",
      link: "#"
    },
    {
      title: "Exercise & Yoga",
      description: "Explore fitness routines and yoga exercises designed for women's overall well-being.",
      link: "#"
    },
    {
      title: "Mental Health Support",
      description: "Resources on stress management, therapy options, and mindfulness techniques.",
      link: "#"
    },
  ];

  const [location, setLocation] = useState({ lat: 30.516086474689523, lng: 76.65720287619507 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Find Us on the Map</h2>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.1751352098286!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1741123942799!5m2!1sen!2sin`}
          width="100%"
          height="450"
          className="rounded-lg shadow-md"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <h1 className="text-4xl font-extrabold text-center text-gray-800 my-8">Women's Health Resources</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900">{resource.title}</h2>
            <p className="mt-3 text-gray-600">{resource.description}</p>
            <a href={resource.link} className="inline-block mt-5 px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}