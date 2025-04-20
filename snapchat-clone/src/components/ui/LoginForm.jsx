'use client';

import { FaMicrosoft } from 'react-icons/fa';

export default function LoginForm() {
  return (
    <div className="p-6 border rounded-xl shadow-md flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Log in to Snapchat</h2>
      <p>Chat, Snap, and video call your friends. Watch Stories and Spotlight, all from your computer.</p>
      <input type="text" placeholder="Username or email address" className="border rounded-md px-4 py-2" />
      <a href="#" className="text-blue-500 text-sm">Use phone number instead</a>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Log in</button>
      <div className="flex items-center justify-center space-x-2">
        <FaMicrosoft size={24} />
        <span>Continue with Microsoft</span>
      </div>
      <a href="#" className="text-sm text-blue-500">Looking for the app? Get it here</a>
    </div>
  );
}
