'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function ChatPage() {
  const { name } = useParams(); // Gets the chat user name from URL

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!name) return;
    const q = query(collection(db, `chats/${name}/messages`), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [name]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, `chats/${name}/messages`), {
      sender: 'You',
      text: newMessage,
      timestamp: new Date(),
    });
    setNewMessage('');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-white">Chat with {name}</h2>
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 rounded-md bg-gray-700">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-md bg-gray-800 text-white"
        />
        <button onClick={sendMessage} className="p-2 bg-blue-500 rounded-md text-white">
          Send
        </button>
      </div>
    </div>
  );
}
