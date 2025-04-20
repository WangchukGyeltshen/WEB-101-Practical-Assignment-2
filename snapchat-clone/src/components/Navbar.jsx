// components/Navbar.jsx
"use client"; // This makes the component a client-side component
import NavItem from './NavItem';
import ActionButtons from './ActionButtons';
import { FaSnapchatGhost, FaTh } from 'react-icons/fa';
import { MdOutlinePlayArrow, MdOutlineChatBubble } from 'react-icons/md';
import { PiSquaresFourBold } from 'react-icons/pi';
import { TbStarsFilled } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Navbar({ onNavigate }) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo + Search */}
      <div className="flex items-center gap-4">
        <FaSnapchatGhost className="text-black text-2xl hover:scale-110 transition-transform" />
        <div className="flex items-center bg-gray-100 px-4 py-1.5 rounded-full text-gray-700 text-sm hover:bg-gray-200 cursor-pointer transition-all transform hover:scale-105">
          <FiSearch className="w-4 h-4 mr-2" />
          <span className="font-medium">Search</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-10">
        <NavItem
          icon={<PiSquaresFourBold size={24} />}
          label="Stories"
          onClick={() => router.push("/stories")}
        />
        <NavItem
          icon={<MdOutlinePlayArrow size={24} />}
          label="Spotlight"
          onClick={() => router.push("/spotlight")}
        />
        <NavItem
          icon={<MdOutlineChatBubble size={24} />}
          label="Chat"
          badge="NEW"
          onClick={() => onNavigate ? onNavigate("chat") : router.push("/chat")}
        />
        <NavItem
          icon={<TbStarsFilled size={24} />}
          label="Lenses"
          onClick={() => router.push("/lenses")}
        />
        <NavItem
          icon={<FaSnapchatGhost size={24} />}
          label="Snapchat+"
          onClick={() => router.push("/plus")}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <FaTh className="bg-gray-100 p-2 rounded-full text-2xl hover:bg-gray-200 cursor-pointer transition-colors transform hover:scale-110" />
        <ActionButtons />
      </div>
    </div>
  );
}