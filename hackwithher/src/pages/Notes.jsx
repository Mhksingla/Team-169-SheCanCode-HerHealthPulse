import React, { useState, useEffect } from "react";
import { db, auth, collection, addDoc, getDocs, updateDoc, doc, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "../utils/firebaseNotes";

export default function CuteNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchNotes(currentUser.uid);
      else setNotes([]);
    });
    return () => unsubscribe();
  }, []);

  const fetchNotes = async (userId) => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users", userId, "notes"));
    const fetchedNotes = querySnapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }));
    setNotes(fetchedNotes);
    setLoading(false);
  };

  const addNewNote = async () => {
    if (!user) return alert("Please log in to add notes.");
    if (newNote.trim() === "") return;

    const docRef = await addDoc(collection(db, "users", user.uid, "notes"), { text: newNote });
    setNotes([...notes, { id: docRef.id, text: newNote }]);
    setNewNote("");
  };

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-100 p-6">
      <div className="w-full max-w-3xl">
        {/* Auth Section */}
        <div className="flex justify-between items-center mb-6">
          {user ? (
            <>
              <p className="text-lg font-bold">Welcome, {user.displayName}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={signIn}>Sign in with Google</button>
          )}
        </div>

        {user && (
          <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <textarea
              className="w-full h-80 p-3 outline-none border border-pink-300 rounded-md resize-none"
              placeholder="Write your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button className="bg-pink-500 text-white px-6 py-2 mt-3 rounded" onClick={addNewNote}>
              ➕ Add Note
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6 max-h-96 overflow-y-auto border border-gray-300 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">Your Past Notes:</h2>
            {notes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="bg-white p-3 rounded-lg shadow mb-2 whitespace-pre-wrap break-words">
                  {note.text}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}