import { FaRobot } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]); // ✅ messages is declared here
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null); // ✅ Moved inside the component

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // ✅ Now it correctly tracks 'messages'

  const toggleChat = () => setChatOpen(!chatOpen);

  const medicalConditions = {
    Fever: "If you have a fever, drink plenty of fluids and rest. If it persists for more than 3 days, consult a doctor.",
    "Cold & Flu": "Stay hydrated, rest, and try steam inhalation to relieve congestion. Over-the-counter medications can help with symptoms.",
    Headache: "Drink water, rest in a dark room, and try pain relief medication if needed. Avoid stress and loud noises.",
    "Stomach Ache": "Avoid spicy foods, drink herbal tea, and rest. Seek medical help if pain is severe or persistent.",
    "Skin Allergy": "Avoid allergens, take antihistamines if necessary, and consult an allergist if symptoms persist.",
    "Muscle Pain": "Apply heat or ice packs, do gentle stretching, and take over-the-counter pain relievers if needed.",
    Hypertension: "Monitor your blood pressure regularly, reduce salt intake, exercise, and consult a doctor for medication if necessary.",
    Diabetes: "Monitor blood sugar levels, follow a balanced diet, exercise regularly, and take prescribed medications.",
    Anxiety: "Practice deep breathing, meditation, or yoga. Seek professional help if anxiety interferes with daily life.",
    Acidity: "Avoid spicy and oily foods, eat smaller meals, and take antacids if needed. Consult a doctor if symptoms persist.",
  };

  const handleConditionClick = (condition) => {
    const botMessage = {
      text: `You selected: ${condition}. ${medicalConditions[condition]}`,
      user: false,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, user: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      setTimeout(() => {
        const botMessage = {
          text: "I'm here to help! Select a medical condition from the options below or describe your issue.",
          user: false,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      <button
        aria-label="Open Health Chatbot"
        className="fixed bottom-5 right-5 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
        onClick={toggleChat}
      >
        <FaRobot size={24} />
      </button>

      {chatOpen && (
        <div className="fixed bottom-16 right-5 bg-white w-96 p-4 rounded-lg shadow-lg border border-pink-300">
          <div className="text-lg font-semibold text-pink-600 border-b pb-2 mb-2">Health Chatbot</div>

          <div className="h-60 overflow-y-auto mb-2">
            <p className="text-gray-700 font-medium">Bot: Select a medical condition to get advice:</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {Object.keys(medicalConditions).map((condition) => (
                <button
                  key={condition}
                  className="bg-pink-100 text-pink-800 p-2 rounded-md text-sm hover:bg-pink-200 transition"
                  onClick={() => handleConditionClick(condition)}
                >
                  {condition}
                </button>
              ))}
            </div>

            <div className="h-52 overflow-y-auto mt-2 p-2 border rounded-md">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mt-2 p-2 rounded-md text-sm font-medium transition-all ${
                    msg.user ? "bg-pink-500 text-white text-right" : "bg-pink-100 text-pink-800 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* ✅ Scroll to this div */}
            </div>
          </div>

          <div className="flex items-center border-t pt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <button
              className="bg-pink-500 text-white p-2 rounded-r hover:bg-pink-600 transition"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;