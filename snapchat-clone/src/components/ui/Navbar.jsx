'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Star,
  PlayCircle,
  MessageCircle,
  Camera,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Stories', icon: <BookOpen size={20} />, href: '/stories' },
    { name: 'Spotlight', icon: <PlayCircle size={20} />, href: '/spotlight' },
    { name: 'Chats', icon: <MessageCircle size={20} />, href: '/chats' },
    { name: 'Lenses', icon: <Camera size={20} />, href: '/lenses' },
    { name: 'Snapchat+', icon: <Sparkles size={20} />, href: '/snapchatplus' },
  ];

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center sticky top-0 z-50 border-b">
      {/* Logo */}
      <div className="text-2xl font-bold text-yellow-400">Snapchat</div>

      {/* Navigation links */}
      <div className="flex space-x-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.name === 'Spotlight' && pathname === '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-400'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Right side: Login or profile */}
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md">
        Log In
      </button>
    </nav>
  );
}
