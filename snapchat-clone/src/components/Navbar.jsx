'use client';

import { FaSnapchatGhost, FaTh } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import NavItem from './NavItem';
import ActionButtons from './ActionButtons';
import { MdOutlinePlayArrow, MdOutlineChatBubble } from 'react-icons/md';
import { PiSquaresFourBold } from 'react-icons/pi';
import { TbStarsFilled } from 'react-icons/tb';
import SearchBar from './SearchBar';

export default function Navbar({ setView, currentView }) {
  return (
    <div className="w-full flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo + Search */}
      <div className="flex items-center gap-4">
        {/* Make logo clickable to go to login page */}
        <button
          onClick={() => {
            setView && setView('home');
          }}
          className="focus:outline-none bg-transparent border-none p-0 m-0"
          aria-label="Go to login"
          type="button"
        >
          <FaSnapchatGhost className="text-black text-2xl cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110" />
        </button>
        <div style={{ width: 160 }}>
          <SearchBar setView={setView} />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-10">
        <NavItem
          icon={<PiSquaresFourBold size={24} />}
          label="Stories"
          onClick={() => setView('stories')}
          active={currentView === 'stories'}
        />
        <NavItem
          icon={<MdOutlinePlayArrow size={24} />}
          label="Spotlight"
          onClick={() => setView('spotlight')}
          active={currentView === 'spotlight'}
        />
        <NavItem
          icon={<MdOutlineChatBubble size={24} />}
          label="Chat"
          onClick={() => setView('chat')}
          active={currentView === 'chat'}
        />
        <NavItem
          icon={<TbStarsFilled size={24} />}
          label="Lenses"
          onClick={() => setView('lenses')}
          active={currentView === 'lenses'}
        />
        <NavItem
          icon={<TbStarsFilled size={24} />}
          label="Snapchat+"
          onClick={() => setView('snapchatplus')}
          active={currentView === 'snapchatplus'}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <FaTh className="bg-gray-100 p-2 rounded-full text-2xl hover:bg-gray-200 cursor-pointer transition-colors transform hover:scale-110" />
        <ActionButtons />
      </div>
    </div>
  );
}