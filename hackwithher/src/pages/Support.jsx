"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaThumbsUp, FaRegCommentDots, FaSmile, FaSadTear, FaHeart } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";

export default function MensGuide() {
  const [posts, setPosts] = useState([
    { id: 1, user: "John", content: "How can I help my wife during her cycle?", likes: 2, reactions: { like: 2, love: 1, sad: 0 } },
    { id: 2, user: "Emily", content: "What are some natural remedies for cramps?", likes: 3, reactions: { like: 1, love: 2, sad: 1 } }
  ]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { id: posts.length + 1, user: "Anonymous", content: newPost, likes: 0, reactions: { like: 0, love: 0, sad: 0 } }]);
      setNewPost("");
    }
  };

  const reactToPost = (id, reactionType) => {
    setPosts(posts.map(post => post.id === id ? { ...post, reactions: { ...post.reactions, [reactionType]: post.reactions[reactionType] + 1 } } : post));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-2xl border border-pink-300"
      >
        <h2 className="text-4xl font-bold text-pink-600 text-center mb-4">
          Couple & Family Support Forum
        </h2>
        <p className="text-gray-700 text-center mb-8 text-lg">
          A safe space to discuss concerns, share experiences, and support each other.
        </p>

      
        <div className="bg-yellow-50 p-4 rounded-lg shadow-md border border-yellow-300 mb-6">
          <h3 className="text-lg font-semibold text-yellow-700">📌 Expert Advice</h3>
          <p className="text-gray-700">It's important to communicate openly and be empathetic to your partner's needs. A simple check-in can make a huge difference!</p>
        </div>

      
        <div className="bg-pink-50 p-6 rounded-lg shadow-md border border-pink-200 mt-8 w-full">
          <h3 className="text-2xl font-semibold text-pink-700 mb-4">💬 Discussions</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto p-2">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-white border border-pink-200 rounded-lg shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <BiUserCircle className="text-gray-500 text-2xl" />
                  <strong className="text-gray-700">{post.user}</strong>
                </div>
                <p className="text-gray-700">{post.content}</p>
                <div className="flex gap-4 mt-2 text-gray-600 text-sm">
                  <button onClick={() => reactToPost(post.id, "like")} className="flex items-center gap-1 hover:text-pink-500">
                    <FaThumbsUp /> {post.reactions.like}
                  </button>
                  <button onClick={() => reactToPost(post.id, "love")} className="flex items-center gap-1 hover:text-red-500">
                    <FaHeart /> {post.reactions.love}
                  </button>
                  <button onClick={() => reactToPost(post.id, "sad")} className="flex items-center gap-1 hover:text-blue-500">
                    <FaSadTear /> {post.reactions.sad}
                  </button>
                  <button className="flex items-center gap-1 hover:text-pink-500">
                    <FaRegCommentDots /> Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Share your thoughts..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all"
              onClick={addPost}
            >
              Post
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">* Please be respectful and supportive in your discussions.</p>
        </div>
      </motion.div>
    </div>
  );
}
