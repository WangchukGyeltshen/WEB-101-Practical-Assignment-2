"use client"; // This ensures the page is a client-side component

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ChatList from "@/components/ui/ChatList";
import CameraBox from "@/components/ui/CameraBox";
import { FiUserPlus, FiSettings } from "react-icons/fi"; // Add necessary icons

export default function Home() {
  const [view, setView] = useState("home"); // "home" | "chat"

  return (
    <>
      <Navbar onNavigate={setView} /> {/* Pass setView to Navbar */}

      {view === "home" ? (
        <>
          {/* Login & Landing Section */}
          <main className="flex flex-col lg:flex-row min-h-screen">
            {/* Left side - Login section */}
            <div className="lg:w-1/2 flex flex-col justify-center px-10 py-16">
              <h1 className="text-3xl font-bold mb-6">Log in to Snapchat</h1>
              <p className="mb-6 text-gray-600">
                Chat, Snap, and video call your friends. Watch Stories and Spotlight, all from your computer.
              </p>

              <input
                type="text"
                placeholder="Username or email address"
                className="mb-4 p-3 border border-gray-300 rounded-md w-full"
              />

              <Link href="#" className="text-sm text-blue-600 mb-4">
                Use phone number instead
              </Link>

              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md mb-6"
                onClick={() => setView("chat")} // Change view to "chat" on login
              >
                Log in
              </button>

              <p className="text-gray-500 mb-3">or continue with downloading Snapchat WebApp</p>
              <a href="https://apps.microsoft.com/store/apps" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/microsoft-store-badge.png"
                  alt="Get it from Microsoft"
                  width={150}
                  height={50}
                />
              </a>

              <p className="text-sm mt-4">
                Looking for the app? Get it{" "}
                <Link href="#" className="underline">
                  here
                </Link>.
              </p>
            </div>

            {/* Right side - Visual section */}
            <div className="lg:w-1/2 bg-[#FFF700] flex flex-col justify-center items-center p-10">
              <h2 className="text-3xl font-extrabold text-black mb-4 text-center">
                LESS SOCIAL MEDIA.
              </h2>

              <h2 className="text-3xl font-extrabold text-black mb-8 text-center">
                MORE SNAPCHAT.
              </h2>

              <Image
                src="/chat.png"
                alt="Snapchat people collage"
                width={2000}
                height={1000}
                className="rounded-lg"
              />
            </div>
          </main>
        </>
      ) : (
        <>
          {/* Chat UI */}
          <div className="flex h-full">
            {/* Sidebar */}
            <aside className="w-1/4 bg-[#1a1a1a] p-5 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                {/* ⚙️ Settings icon button */}
                <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-full transition duration-200">
                  <FiSettings size={20} />
                </button>

                {/* Friend Add Button stays */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-200 shadow">
                  <FiUserPlus size={20} />
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search"
                className="bg-[#2a2a2a] text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-5"
              />

              {/* Chats */}
              <ChatList />
            </aside>

            {/* Camera */}
            <main className="flex-1 bg-[#2a2a2a] flex items-center justify-center p-3">
              <CameraBox />
            </main>

            {/* Right Panel */}
            <aside className="w-1/4 bg-[#2a2a2a] flex items-center justify-center p-5">
              <Image src="/avatar.png" alt="Bitmoji Full" width={320} height={520} />
            </aside>
          </div>
        </>
      )}

      {/* Footer (optional to show only on home view) */}
      {view === "home" && (
        <footer className="w-full bg-black text-white text-center py-3 text-sm">
          Are you a parent? Learn what we're doing to help keep{" "}
          <Link href="#" className="underline text-yellow-400">
            Snapchatters safe.
          </Link>
        </footer>
      )}
    </>
  );
}