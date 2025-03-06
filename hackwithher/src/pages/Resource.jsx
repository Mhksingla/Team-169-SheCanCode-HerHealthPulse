import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});



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
  const [doctors, setDoctors] = useState([]);


  const fetchNearbyDoctors = async (lat, lng) => {
    const query = `
      [out:json];
      node["amenity"="doctors"](around:5000, ${lat}, ${lng});
      out;
    `;
    const url = "https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}";
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.elements) {
        setDoctors(
          data.elements.map((doctor) => ({
            id: doctor.id,
            name: doctor.tags.name || "Unknown Doctor",
            lat: doctor.lat,
            lng: doctor.lon,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          fetchNearbyDoctors(userLocation.lat, userLocation.lng); 
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
        <MapContainer center={location} zoom={13} style={{ height: "450px", width: "100%" }} className="rounded-lg shadow-md">
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {}
  <Marker position={location} icon={markerIcon}>
    <Popup>Your Location</Popup>
  </Marker>
  {}
  {doctors.map((doctor) => (
    <Marker key={doctor.id} position={{ lat: doctor.lat, lng: doctor.lng }} icon={markerIcon}>
      <Popup>{doctor.name}</Popup>
    </Marker>
  ))}
</MapContainer>
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