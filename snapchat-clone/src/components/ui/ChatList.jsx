'use client';
import React from 'react';
import Link from 'next/link';

const chats = [
  {
    name: 'My AI',
    image: '/avatars/MyAi.png', 
    time: '2h',
    ai: true,
  },
  {
    name: 'Team Snapchat',
    image: '/avatars/snapchat-logo.svg', 
    time: '2h',
    team: true,
  },
];

export default function ChatList() {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 px-1 scrollbar-thin scrollbar-thumb-gray-700">
      {chats.map((chat, idx) => (
        <Link
          key={idx}
          href={`/chat/${chat.name}`}
          className="flex items-center justify-between p-3 hover:bg-[#333] rounded-lg transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-600 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <img
                src={chat.image}
                alt={chat.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="font-medium text-white">{chat.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}