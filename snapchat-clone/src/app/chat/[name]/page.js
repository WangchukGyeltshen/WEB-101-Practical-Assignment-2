'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import io from "socket.io-client";
import { FiArrowLeft, FiCamera, FiSmile } from "react-icons/fi";

export default function ChatPage() {
  const { name } = useParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!name) return;
    const q = query(collection(db, `chats/${name}/messages`), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, [name]);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : "You";
    s.emit('joinRoom', { userId, otherUserId: name });
    s.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => { s.disconnect(); };
  }, [name]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, `chats/${name}/messages`), {
      sender: 'You',
      text: newMessage,
      timestamp: new Date(),
    });
    if (socket) {
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : "You";
      socket.emit('chatMessage', { from: userId, to: name, message: newMessage });
    }
    setNewMessage('');
  };

  // Avatar fallback
  const getAvatar = () => {
    if (name === "My AI") return "/avatars/MyAi.png";
    if (name === "Team Snapchat") return "/avatars/snapchat-logo.svg";
    return "/avatars/avatar1.png";
  };

  return (
    <div className="flex flex-col h-screen bg-[#f7f7fa]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#18181a] border-b border-[#232325]">
        <button
          className="text-white p-2 rounded-full hover:bg-[#232325] transition"
          onClick={() => router.back()}
        >
          <FiArrowLeft size={22} />
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
          <img src={getAvatar()} alt={name} className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-semibold text-lg">{name}</span>
      </div>
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-0 py-6 bg-[url('/chat-bg.png')] bg-cover bg-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-3 px-2">
          {messages.map((msg, idx) => {
            const isMe = msg.sender === "You";
            return (
              <div
                key={idx}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[70%] px-4 py-2 rounded-2xl
                    ${isMe
                      ? "bg-[#232325] text-white rounded-br-md"
                      : "bg-white text-black rounded-bl-md border border-gray-200"}
                    shadow
                  `}
                  style={{
                    borderTopLeftRadius: isMe ? 18 : 6,
                    borderTopRightRadius: isMe ? 6 : 18,
                  }}
                >
                  <span className={`block text-xs font-semibold mb-1 ${isMe ? "text-blue-400" : "text-yellow-500"}`}>
                    {isMe ? "YOU" : name.toUpperCase()}
                  </span>
                  <span className="block text-base">{msg.text}</span>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
      </div>
      {/* Input area */}
      <div className="w-full px-0 py-4 bg-[#18181a] border-t border-[#232325]">
        <div className="max-w-2xl mx-auto flex items-center gap-2 px-2">
          <button className="p-2 text-gray-400 hover:text-blue-500">
            <FiCamera size={22} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Send a chat"
              className="w-full rounded-full bg-[#232325] text-white px-5 py-3 outline-none border-none placeholder-gray-400"
              onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400">
              <FiSmile size={22} />
            </button>
          </div>
          <button
            onClick={sendMessage}
            className="ml-1 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
