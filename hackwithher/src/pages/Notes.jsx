import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, updateDoc, doc } from "../utils/firebaseConfig";

export default function CuteNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const fetchedNotes = querySnapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }));
      setNotes(fetchedNotes);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const addNewNote = () => {
    setNotes([...notes, { id: null, text: "" }]); // New note with null ID
  };

  const updateNote = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = value;
    setNotes(updatedNotes);
  };

  const saveAllNotes = async () => {
    for (let note of notes) {
      if (note.id) {
        // If note exists in Firestore, update it
        const noteRef = doc(db, "notes", note.id);
        await updateDoc(noteRef, { text: note.text });
      } else {
        // If note is new, add it to Firestore
        const docRef = await addDoc(collection(db, "notes"), { text: note.text });
        note.id = docRef.id;
      }
    }

    // Clear notes from UI after saving
    setNotes([]);

    alert("All notes saved successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-24 w-11/12 max-w-3xl flex flex-col items-center space-y-6">
          {notes.map((note, index) => (
            <div key={index} className="relative w-full bg-white p-4 rounded-lg shadow-lg">
              <textarea
                className="w-full h-80 bg-transparent p-3 outline-none border-2 border-pink-300 rounded-md text-gray-700 resize-none"
                style={{
                  background: `repeating-linear-gradient(white, white 24px, #ff99c8 25px)`,
                  lineHeight: "45px",
                }}
                placeholder="Write your note here..."
                value={note.text}
                onChange={(e) => updateNote(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold hover:bg-pink-600 transition transform hover:scale-110"
          onClick={addNewNote}
        >
          ➕ Add New Note
        </button>

        <button
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold hover:bg-green-600 transition transform hover:scale-110"
          onClick={saveAllNotes}
        >
          💾 Save All Notes
        </button>
      </div>
    </div>
  );
}
