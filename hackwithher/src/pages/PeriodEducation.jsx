import React from "react";

const PeriodEducation = () => {
  const videos = [
    {
      src: "/why.mp4",
      type: "video/mp4",
      title: "Why you get periods!",
      description: "Periods, also known as menstruation, are a natural process that occurs in people with a uterus as part of the menstrual cycle. This cycle prepares the body for pregnancy each month. If pregnancy does not occur, the body sheds the uterine lining, resulting in bleeding, which we call a period."
    },
    {
      src: "/pads.mp4",
      type: "video/mp4",
      title: "How to Dispose of Used Pads",
      description: "Learn the correct and hygienic way to dispose of used sanitary pads to ensure proper waste management and hygiene."
    },
    {
      src: "/types.mp4",
      type: "video/mp4",
      title: "Choose the right sanitary Pad",
      description: "Selecting the right pad ensures comfort and protection. Pads vary in size, absorbency, and material to match your flow. Watch this video to find the best option for you!."
    },
    {
      src: "/ovulation.mp4", 
      type: "video/mp4",
      title: "Trying to Concieve!! Watch it.",
      description: "An educational guide to understanding the different phases of the menstrual cycle and how it affects your ovulation and body."
    }
  ];

  return (
    <div className="min-h-screen bg-pink-100 py-12 px-4 md:px-12 text-gray-800">
      {}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center bg-pink-600 text-white py-3 rounded-md mb-6">
          Educational Videos
        </h1>
        <div className="space-y-8">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-6 bg-pink-50 p-6 rounded-lg shadow-md">
              {video.type ? (
                <video className="w-full md:w-1/2 h-64 rounded-lg" controls>
                  <source src={video.src} type={video.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  className="w-full md:w-1/2 h-64 rounded-lg"
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <div className="md:w-1/2 text-gray-800">
                <h2 className="text-xl font-semibold text-pink-700">{video.title}</h2>
                <p className="mt-2 text-gray-700">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodEducation;
