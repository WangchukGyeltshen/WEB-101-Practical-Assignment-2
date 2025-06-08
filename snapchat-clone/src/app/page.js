'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SpotlightPage from "@/components/spotlight/page";
import StoriesPage from "@/components/stories/page";
import LensesPage from "@/components/lenses/page";
import SnapchatPlusPage from "@/components/snapchat-plus/page";
import Signup from "@/components/signup/Signup";

import ChatList from "@/components/ui/ChatList";
import CameraBox from "@/components/ui/CameraBox";
import { FiSettings, FiUserPlus } from "react-icons/fi";

export default function Home() {
  const [view, setView] = useState("home");
  const [showSignup, setShowSignup] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleMainLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        // Optionally redirect or set user state here
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  return (
    <>
      <Navbar setView={setView} currentView={view} />

      <main className="flex flex-col lg:flex-row min-h-screen">
        {/* 🏠 Home/Login/Signup */}
        {view === "home" && (
          !showSignup ? (
            <>
              <div className="lg:w-1/2 flex flex-col justify-center px-10 py-16">
                <h1 className="text-3xl font-bold mb-6">Log in to Snapchat</h1>
                <p className="mb-6 text-gray-600">
                  Chat, Snap, and video call your friends. Watch Stories and Spotlight, all from your computer.
                </p>

                <form onSubmit={handleMainLogin}>
                  <input
                    type="text"
                    placeholder="Username or email address"
                    className="mb-4 p-3 border border-gray-300 rounded-md w-full"
                    value={loginUsername}
                    onChange={e => setLoginUsername(e.target.value)}
                    required
                  />

                  <Link href="#" className="text-sm text-blue-600 mb-4">
                    Use phone number instead
                  </Link>

                  <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 p-3 border border-gray-300 rounded-md w-full"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md mb-6 w-full"
                  >
                    Log in
                  </button>
                  {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
                </form>

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
                  Looking for the app? Get it{" "}
                  <Link href="#" className="underline">
                    here
                  </Link>.
                </p>
                <div className="mt-6 text-center">
                  <span className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <button
                      className="text-blue-600 underline"
                      onClick={() => setShowSignup(true)}
                    >
                      Sign Up
                    </button>
                  </span>
                </div>
              </div>

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

              <footer className="w-full bg-black text-white text-center py-3 text-sm fixed bottom-0">
                Are you a parent? Learn what we're doing to help keep{" "}
                <Link href="#" className="underline text-yellow-400">
                  Snapchatters safe.
                </Link>
              </footer>
            </>
          ) : (
            <div className="w-full flex justify-center items-center min-h-screen bg-[#f7f7f7]">
              <Signup onBack={() => setShowSignup(false)} />
            </div>
          )
        )}

        {/* 🔦 Spotlight Page */}
        {view === "spotlight" && <SpotlightPage />}

        {/* 📚 Stories Page */}
        {view === "stories" && <StoriesPage />}

        {/* 🔍 Lenses Page */}
        {view === "lenses" && <LensesPage />}

        {/* ✨ Snapchat+ Page */}
        {view === "snapchatplus" && <SnapchatPlusPage />}

        {/* 💬 Chat Page */}
        {view === "chat" && (
          <div className="flex h-screen w-full">
            {/* Left Sidebar */}
            <aside className="w-1/4 bg-[#1a1a1a] p-5 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-full transition duration-200">
                  <FiSettings size={20} />
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-200 shadow">
                  <FiUserPlus size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-[#2a2a2a] text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-5"
              />
              <ChatList />
            </aside>

            {/* Middle: Camera */}
            <main className="flex-1 bg-[#2a2a2a] flex items-center justify-center p-3">
              <CameraBox />
            </main>

            {/* Right Sidebar */}
            <aside className="w-1/4 bg-[#2a2a2a] flex items-center justify-center p-5">
              <Image
                src="/avatar.png"
                alt="Bitmoji Full"
                width={320}
                height={520}
              />
            </aside>
          </div>
        )}

        {/* 📦 Placeholder for other views */}
        {!(
          view === "home" ||
          view === "spotlight" ||
          view === "stories" ||
          view === "lenses" ||
          view === "snapchatplus" ||
          view === "chat"
        ) && (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-2xl font-bold mb-4">
              This page will be added soon
            </h1>
            <p className="text-gray-600">Stay tuned for updates!</p>
          </div>
        )}
      </main>
    </>
  );
}
