import { useState } from "react";
import { FaRobot } from "react-icons/fa";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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

      // Simulate a bot response after 1 second
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
      {/* Chatbot Toggle Button */}
      <button
        aria-label="Open Health Chatbot"
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        onClick={toggleChat}
      >
        <FaRobot size={24} />
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-16 right-5 bg-white w-80 p-4 rounded-lg shadow-lg border">
          <div className="text-lg font-semibold border-b pb-2 mb-2">Health Chatbot</div>
          
          <div className="h-60 overflow-y-auto mb-2">
            {/* Initial Bot Message */}
            {messages.length === 0 && (
              <div className="mb-2">
                <p className="text-gray-700 font-medium">Bot: Select a medical condition to get advice:</p>
                <div className="grid grid-cols-2 gap-2 mt-2 overflow-y-auto max-h-28">
                  {Object.keys(medicalConditions).map((condition) => (
                    <button
                      key={condition}
                      className="bg-blue-100 text-blue-800 p-2 rounded-md text-sm hover:bg-blue-200 transition"
                      onClick={() => handleConditionClick(condition)}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  msg.user ? "bg-blue-100 text-blue-800 text-right" : "bg-gray-100 text-gray-700 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t pt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition"
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
