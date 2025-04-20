import NavItem from './NavItem';
import ActionButtons from './ActionButtons';
import { FaSnapchatGhost, FaTh } from 'react-icons/fa';
import { MdOutlinePlayArrow, MdOutlineChatBubble } from 'react-icons/md';
import { PiSquaresFourBold } from 'react-icons/pi';
import { TbStarsFilled } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';

export default function Navbar({ setView, currentView }) {
  return (
    <div className="w-full flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo + Search */}
      <div className="flex items-center gap-4">
        <FaSnapchatGhost
          onClick={() => setView("home")}
          className="text-black text-2xl cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
        <div className="flex items-center bg-gray-100 px-4 py-1.5 rounded-full text-gray-700 text-sm hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105">
          <FiSearch className="w-4 h-4 mr-2" />
          <span className="font-medium">Search</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-10">
        <NavItem
          icon={<PiSquaresFourBold size={24} />}
          label="Stories"
          onClick={() => setView("stories")}
          active={currentView === "stories"}
        />
        <NavItem
          icon={<MdOutlinePlayArrow size={24} />}
          label="Spotlight"
          onClick={() => setView("spotlight")}
          active={currentView === "spotlight"}
        />
        <NavItem
          icon={<MdOutlineChatBubble size={24} />}
          label="Chat"
          onClick={() => setView("chat")}
          active={currentView === "chat"}
        />
        <NavItem
          icon={<TbStarsFilled size={24} />}
          label="Lenses"
          onClick={() => setView("lenses")}
          active={currentView === "lenses"}
        />
        <NavItem
          icon={<FaSnapchatGhost size={24} />}
          label="Snapchat+"
          onClick={() => setView("snapchatPlus")}
          active={currentView === "snapchatPlus"}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <FaTh className="bg-gray-100 p-2 rounded-full text-2xl hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out transform hover:scale-110" />
        <ActionButtons />
      </div>
    </div>
  );
}
