'use client';

import { FaSnapchatGhost, FaWhatsapp, FaReddit, FaPinterest, FaFacebookMessenger } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';

export default function SnapInfo() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Get In On Snapchat's Trending Videos</h2>
      <p>Watch Viral Spotlight Videos From Popular Creators To See What's Trending.</p>

      <div className="flex items-center space-x-4 border p-4 rounded-xl shadow-md">
        <FaSnapchatGhost size={40} />
        <div>
          <p className="font-bold">Sangay Lhamo</p>
          <p className="text-gray-500">@s_lhamo20238839</p>
        </div>
      </div>

      <div className="flex items-center border p-4 rounded-xl shadow-md">
        <span className="font-semibold">@s_lhamo20238839's Sound</span>
      </div>

      <div className="flex space-x-3">
        <FaFacebookMessenger size={28} className="text-blue-500" />
        <FaWhatsapp size={28} className="text-green-500" />
        <FaReddit size={28} className="text-orange-500" />
        <FaPinterest size={28} className="text-red-600" />
        <FaSnapchatGhost size={28} className="text-yellow-400" />
        <button className="flex items-center border px-3 py-1 rounded-md space-x-1">
          <BsLink45Deg size={20} />
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
}
