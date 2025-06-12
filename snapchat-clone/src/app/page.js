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
import SearchResultsPage from "@/components/SearchResultsPage";

import ChatList from "@/components/ui/ChatList";
import CameraBox from "@/components/ui/CameraBox";
import { FiSettings, FiUserPlus } from "react-icons/fi";

export default function Home() {
  const [view, setViewRaw] = useState("home");
  const [showSignup, setShowSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState(""); // Add loginEmail state
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const [countryCode, setCountryCode] = useState("+975");
  const [loginPhone, setLoginPhone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // <-- Add this

  const countryCodes = [
    { code: "+975", label: "BT" },
    { code: "+91", label: "IN" },
    { code: "+1", label: "US" },
    { code: "+44", label: "UK" },
  ];

  // Add a helper to get max length based on country code
  function getPhoneMaxLength(code) {
    switch (code) {
      case "+975": return 8; // BT
      case "+91": return 10; // IN
      case "+1": return 10; // US
      case "+44": return 11; // UK
      default: return 15;
    }
  }

  const handleMainLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      let payload;
      if (usePhone) {
        payload = { phone: countryCode + loginPhone, password: loginPassword };
      } else {
        payload = { email: loginEmail, password: loginPassword };
      }
      // Use absolute URL to backend
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        setIsAuthenticated(true); // <-- Set authenticated
        // Optionally redirect or set user state here
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  // Helper to handle view changes with optional query
  const setView = (v, q) => {
    setViewRaw(v);
    if (v === "search" && q) setSearchQuery(q);
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
                  {!usePhone ? (
                    <input
                      type="email"
                      placeholder="Email address"
                      className="mb-4 p-3 border border-gray-300 rounded-md w-full"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      required
                    />
                  ) : (
                    <div className="flex mb-4">
                      <select
                        value={countryCode}
                        onChange={e => {
                          setCountryCode(e.target.value);
                          setLoginPhone(""); // reset phone on country change
                        }}
                        className="p-3 border border-gray-300 rounded-l-md bg-white"
                        style={{ minWidth: 130, fontSize: "1.1rem" }}
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        className="p-3 border-t border-b border-gray-300 rounded-r-md w-full"
                        style={{ fontSize: "1.1rem", minWidth: 0, flex: 1 }}
                        value={loginPhone}
                        maxLength={getPhoneMaxLength(countryCode)}
                        onChange={e => {
                          // Only allow digits and respect max length
                          const maxLen = getPhoneMaxLength(countryCode);
                          const val = e.target.value.replace(/\D/g, "").slice(0, maxLen);
                          setLoginPhone(val);
                        }}
                        required
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="text-sm text-blue-600 mb-4 underline bg-transparent border-none p-0"
                    onClick={() => {
                      setUsePhone((v) => !v);
                      setLoginError("");
                    }}
                  >
                    {usePhone ? "Use username or email address instead" : "Use phone number instead"}
                  </button>

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
          !isAuthenticated ? (
            // Show login form like screenshot if not authenticated
            <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#f7f7f7]">
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-sm">
                <div className="mb-4">
                  <img src="/snapchat-logo.svg" alt="Snapchat" className="mx-auto w-16 h-16" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-center">Log in to Snapchat</h2>
                <form onSubmit={handleMainLogin} className="w-full">
                  <label className="block text-gray-700 text-sm font-semibold mb-1 mt-4">
                    Username or Email
                  </label>
                  {/* Phone/email switcher, like main login */}
                  {!usePhone ? (
                    <>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="mb-2 p-3 border border-gray-300 rounded-md w-full"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="text-sm text-blue-600 mb-2 underline bg-transparent border-none p-0"
                        onClick={() => {
                          setUsePhone(true);
                          setLoginError("");
                        }}
                      >
                        Use phone number instead
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex mb-2">
                        <select
                          value={countryCode}
                          onChange={e => {
                            setCountryCode(e.target.value);
                            setLoginPhone(""); // reset phone on country change
                          }}
                          className="p-3 border border-gray-300 rounded-l-md bg-white"
                          style={{ minWidth: 90, fontSize: "1.1rem" }}
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          className="p-3 border-t border-b border-gray-300 rounded-r-md w-full"
                          style={{ fontSize: "1.1rem", minWidth: 0, flex: 1 }}
                          value={loginPhone}
                          maxLength={getPhoneMaxLength(countryCode)}
                          onChange={e => {
                            const maxLen = getPhoneMaxLength(countryCode);
                            const val = e.target.value.replace(/\D/g, "").slice(0, maxLen);
                            setLoginPhone(val);
                          }}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="text-sm text-blue-600 mb-2 underline bg-transparent border-none p-0"
                        onClick={() => {
                          setUsePhone(false);
                          setLoginError("");
                        }}
                      >
                        Use username or email address instead
                      </button>
                    </>
                  )}
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
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md mb-2 w-full"
                  >
                    Next
                  </button>
                  {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
                </form>
                <div className="mt-4 text-center">
                  <span className="text-gray-600 text-sm">
                    New To Snapchat?{" "}
                    <button
                      className="text-blue-600 font-bold underline"
                      onClick={() => {
                        setShowSignup(true);
                        setViewRaw("home");
                      }}
                    >
                      Sign Up
                    </button>
                  </span>
                </div>
              </div>

              {/* Footer like screenshot */}
              <footer className="w-full mt-8">
                <div className="flex flex-wrap justify-center gap-8 text-xs text-gray-500">
                  <div>
                    <div className="font-bold text-black mb-1">Company</div>
                    <div>Snap Inc.</div>
                    <div>Careers</div>
                    <div>News</div>
                  </div>
                  <div>
                    <div className="font-bold text-black mb-1">Community</div>
                    <div>Support</div>
                    <div>Community Guidelines</div>
                    <div>Safety Center</div>
                  </div>
                  <div>
                    <div className="font-bold text-black mb-1">Advertising</div>
                    <div>Buy Ads</div>
                    <div>Advertising Policies</div>
                    <div>Political Ads Library</div>
                    <div>Brand Guidelines</div>
                    <div>Promotions Rules</div>
                  </div>
                  <div>
                    <div className="font-bold text-black mb-1">Legal</div>
                    <div>Privacy Center</div>
                    <div>Your Privacy Choices</div>
                    <div>Cookie Policy</div>
                    <div>Report Infringement</div>
                    <div>Custom Creative Tools Terms</div>
                    <div>Community Geofilter Terms</div>
                    <div>Lens Studio Terms</div>
                  </div>
                  <div>
                    <div className="font-bold text-black mb-1">Language</div>
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                      <option>English (US)</option>
                    </select>
                  </div>
                </div>
              </footer>
            </div>
          ) : (
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
          )
        )}

        {/* 🔍 Search Results Page */}
        {view === "search" && (
          <SearchResultsPage query={searchQuery} />
        )}

        {/* 📦 Placeholder for other views */}
        {!(
          view === "home" ||
          view === "spotlight" ||
          view === "stories" ||
          view === "lenses" ||
          view === "snapchatplus" ||
          view === "chat" ||
          view === "search" // <-- add this so placeholder does not show on search
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