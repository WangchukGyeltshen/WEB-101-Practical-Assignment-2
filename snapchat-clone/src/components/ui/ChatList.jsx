'use client';
import React from 'react';
import Link from 'next/link';

// Sample chat data
const chats = [
  { name: 'SWE', newSnap: true, image: '/WhatsApp Image 2025-04-19 at 16.31.56 (1).jpeg' },
  { name: 'Jigme Chogyal', time: '21m', emoji: '231🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.47 (1).jpeg' },
  { name: 'Namgay Lhamo', time: '25m', emoji: '223🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.55.jpeg' },
  { name: 'Yeshey Zhennue', time: '28m', emoji: '1232😜', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.48.56.jpeg' },
  { name: 'Wangchuck', time: '54m', emoji: '1067🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.48.jpeg' },
  { name: 'Sherab', time: '1h', emoji: '123🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.55 (1).jpeg' },
  { name: 'Sonam Choden', time: '1h', emoji: '205🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.56.jpeg' },
  { name: 'Kuenga Choden', time: '1h', emoji: '163🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.49.jpeg' },
  { name: 'Sonam Dorji', time: '1h', emoji: '296🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.47.jpeg' },
  { name: 'Chokiss', time: '1h', emoji: '96🔥', reply: true, image: '/WhatsApp Image 2025-04-19 at 16.31.48 (1).jpeg' },
];

export default function ChatList() {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 px-1 scrollbar-thin scrollbar-thumb-gray-700">
      {/* Chat Items with navigation */}
      {chats.map((chat, idx) => (
        <Link
          key={idx}
          href={`/chat/${chat.name}`}

          className="flex items-center justify-between p-3 hover:bg-[#333] rounded-lg transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
              <img
                src={chat.image}
                alt={chat.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="font-medium text-white">{chat.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                {chat.newSnap
                  ? 'New Snap on mobile'
                  : `Received · ${chat.time} ${chat.emoji || ''}`}
              </p>
            </div>
          </div>
          {chat.reply && (
            <button className="text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors">
              Reply
            </button>
          )}
        </Link>
      ))}
    </div>
  );
}