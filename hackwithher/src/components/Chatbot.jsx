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
    MoodSwings: "Track your menstrual cycle, practice stress-relief techniques like yoga or meditation, and maintain a balanced diet. Consult a doctor if mood swings are severe or disruptive.",
    PMS: "Reduce caffeine and sugar intake, exercise regularly, and get adequate sleep. Over-the-counter pain relievers can help with cramps. Consider supplements like calcium or magnesium after consulting a doctor.",
Menopause_Related_MoodChanges: "Stay active with regular exercise, practice mindfulness, and maintain a healthy diet. Consult a healthcare provider for hormone replacement therapy (HRT) or natural remedies if needed.",
Stress_Anxiety: "Practice relaxation techniques like meditation, journaling, or aromatherapy. Seek support from friends, family, or a therapist if needed.",
Fatigue_LowEnergy: "Ensure adequate sleep, stay hydrated, and eat iron-rich foods. Regular exercise can boost energy levels. Consult a doctor if fatigue persists.",
Irritability: "Identify triggers, practice calming techniques like deep breathing, and avoid over-scheduling. Prioritize downtime and self-care.",
Depression: "Seek professional help if feelings of sadness persist. Engage in regular physical activity, maintain social connections, and consider therapy or medication if recommended.",
Bloating: "Reduce salt intake, drink plenty of water, and eat potassium-rich foods. Gentle exercise like walking can help reduce bloating.",
SleepDisturbances: "Establish a bedtime routine, avoid screens before bed, and create a calm sleep environment. Herbal teas like chamomile or valerian root may promote relaxation.",
Low_Libido: "Communicate openly with your partner, manage stress, and prioritize self-care. Consult a doctor if low libido persists or is linked to hormonal changes."
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