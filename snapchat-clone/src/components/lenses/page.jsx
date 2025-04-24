'use client';

import SnapInfo from '@/components/ui/SnapInfo';
import Image from 'next/image';

export default function LensesPage() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      {/* Left: Login + Description */}
      <div className="lg:w-1/3 p-10">
        <h1 className="text-3xl font-bold mb-4">Log in to Snapchat</h1>
        <p className="text-gray-600 mb-6">
          Chat, Snap, and video call your friends. Watch Stories and Spotlight, all from your computer.
        </p>

        {/* You can add a login form here if needed */}
        <div className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Username or email"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            Log In
          </button>
        </div>

        <p className="text-gray-500 mb-3">
          or continue with downloading Snapchat WebApp
        </p>

        <a
          href="https://apps.microsoft.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/microsoft-store-badge.png"
            alt="Get it from Microsoft"
            width={150}
            height={50}
          />
        </a>

        <p className="text-sm mt-4">
          Looking for the app? Get it{' '}
          <a href="#" className="underline text-blue-600">
            here
          </a>
          .
        </p>
      </div>

      {/* Right: Lenses section */}
      <div className="lg:w-2/3 bg-white px-8 py-10">
        <h2 className="text-4xl font-extrabold mb-2">Check Out Popular Snapchat Lenses</h2>
        <p className="text-gray-600 mb-6">
          Try Popular Filters And Meet The Creators Behind Them.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['For You', 'Face', 'World', 'Music', 'Creators', 'Live'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Lens Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <SnapInfo
            src="/lenses/neutral.png"
            name="Neutral Light Lens"
            author="Snapchat"
          />
          <SnapInfo
            src="/lenses/balaclava.png"
            name="Balaclava Lens"
            author="Awad ✨"
          />
          <SnapInfo
            src="/lenses/smiley.png"
            name="Smiley Mouth Lens"
            author="Snap Inc."
          />
          <SnapInfo
            src="/lenses/dog.png"
            name="Snow White Dog Lens"
            author="Snapchat"
          />
          <SnapInfo
            src="/lenses/greenscreen.png"
            name="Green Screen Video Lens"
            author="Snapchat"
          />
        </div>
      </div>
    </main>
  );
}
