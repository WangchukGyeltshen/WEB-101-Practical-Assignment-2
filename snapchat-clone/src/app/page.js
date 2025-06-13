'use client';

import { useState, useRef, useEffect } from "react";
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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("SnapUser"); // Add this line for demo, replace with real username after login
  const [showRightNav, setShowRightNav] = useState(false);
  const [showSpotlightFeed, setShowSpotlightFeed] = useState(false); // Add state for spotlight feed popup
  const [showStoriesFeed, setShowStoriesFeed] = useState(false); // <-- NEW: state for stories popup
  const [spotlightUploading, setSpotlightUploading] = useState(false);
  const [spotlightUploadError, setSpotlightUploadError] = useState('');
  const [refreshSpotlightFeed, setRefreshSpotlightFeed] = useState(0);

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

  // Helper to handle view changes with optional query
  const setView = (v, q) => {
    setViewRaw(v);
    if (v === "search" && q) setSearchQuery(q);
  };

  // Add goToChats helper
  const goToChats = () => {
    setIsAuthenticated(true);
    setViewRaw("chat");
  };

  // Update login handler to use goToChats
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
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        // If backend returns username, set it here:
        if (data.user && data.user.username) setUsername(data.user.username);
        if (data.token) localStorage.setItem('token', data.token); // <-- Save token for later use
        goToChats();
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  // Spotlight video upload handler
  const handleSpotlightUpload = async (file) => {
    setSpotlightUploading(true);
    setSpotlightUploadError('');
    const formData = new FormData();
    formData.append('video', file);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('http://localhost:3001/api/spotlight/upload', {
        method: 'POST',
        headers,
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setSpotlightUploadError(data.error || 'Upload failed');
      } else {
        setRefreshSpotlightFeed((v) => v + 1); // trigger feed refresh
      }
    } catch (err) {
      setSpotlightUploadError('Network error');
    }
    setSpotlightUploading(false);
  };

  return (
    <>
      {/* Only show Navbar if not in authenticated chat page */}
      {!(view === "chat" && isAuthenticated) && (
        <Navbar setView={setView} currentView={view} />
      )}

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
        {view === "stories" && (
          <StoriesPage goToChats={goToChats} />
        )}

        {/* 🔍 Lenses Page */}
        {view === "lenses" && (
          <LensesPage goToChats={goToChats} />
        )}

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
            <div className="flex h-screen w-full relative overflow-hidden">
              {/* Background image for authenticated chat page */}
              <img
                src="/hotair.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{ objectPosition: "center", opacity: 0.25, pointerEvents: "none" }}
              />
              {/* Top left bar: profile, logo, add friend */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-22">
                {/* Profile button */}
                <button
                  className="bg-black rounded-full shadow p-1 hover:bg-gray-800 transition flex items-center justify-center"
                  aria-label="User Profile"
                  style={{ width: 38, height: 38 }}
                  onClick={() => alert("Profile page coming soon!")}
                >
                  <span className="text-white font-bold text-lg select-none">
                    {(username && username[0]) ? username[0].toUpperCase() : "S"}
                  </span>
                </button>
                {/* Snapchat logo (PNG version) */}
                <div className="bg-white rounded-full shadow flex items-center justify-center overflow-hidden" style={{ width: 38, height: 38 }}>
                  <img
                    src="/snapchat logo.png"
                    alt="Snapchat"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Add friend button */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-200 shadow" aria-label="Add Friend">
                  <FiUserPlus size={20} />
                </button>
              </div>
              {/* Left Sidebar */}
              <aside className="w-1/4 bg-[#1a1a1a] p-5 flex flex-col z-20 relative overflow-y-auto h-full">
                {/* Remove background image from left sidebar by setting background color and z-index */}
                <div className="flex items-center justify-between mb-6">
                  <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-full transition duration-200">
                    <FiSettings size={20} />
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
              <main
                className="flex-1 bg-[#2a2a2a] flex items-center justify-center p-3 z-10 relative"
                style={
                  showSpotlightFeed || showStoriesFeed
                    ? { justifyContent: "flex-start" }
                    : {}
                }
              >
                <div
                  style={
                    showSpotlightFeed || showStoriesFeed
                      ? { marginLeft: 130, transition: "margin 0.3s" }
                      : { transition: "margin 0.3s" }
                  }
                >
                  <CameraBox />
                </div>
              </main>

              {/* Right mini nav bar as a sliding popup */}
              <aside
                className={`fixed top-0 right-0 h-full w-20 bg-[#232325] flex flex-col items-center z-40 transition-transform duration-300 ease-in-out`}
                style={{
                  transform: showRightNav ? "translateX(0)" : "translateX(100%)",
                  justifyContent: "center",
                }}
              >
                {/* Toggle right nav button (stick to left edge of nav) */}
                <button
                  className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 z-50 bg-[#232325] hover:bg-[#333] text-white p-2 rounded-l-full shadow transition-all duration-300"
                  onClick={() => setShowRightNav(v => !v)}
                  aria-label={showRightNav ? "Hide navigation" : "Show navigation"}
                  style={{
                    // No extra offset, always stick to nav
                  }}
                >
                  {showRightNav ? <FaChevronRight size={22} /> : <FaChevronLeft size={22} />}
                </button>
                <div className="flex flex-col items-center gap-8" style={{ marginTop: "1vh" }}>
                  <button
                    className="flex flex-col items-center text-white hover:text-yellow-400 focus:outline-none"
                    onClick={() => setShowSpotlightFeed(true)}
                    title="Spotlight"
                  >
                    {/* Play button icon */}
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                      <polygon points="8,5 21,12 8,19" fill="currentColor"/>
                    </svg>
                    <span className="text-xs mt-1">Spotlight</span>
                  </button>
                  <button
                    className="flex flex-col items-center text-white hover:text-yellow-400 focus:outline-none"
                    onClick={() => setShowStoriesFeed(true)} // <-- Open stories popup
                    title="Stories"
                  >
                    {/* Four cubes icon (like main page) */}
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor"/>
                      <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor"/>
                      <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor"/>
                      <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor"/>
                    </svg>
                    <span className="text-xs mt-1">Stories</span>
                  </button>
                </div>
              </aside>

              {/* Spotlight Video Feed Popup */}
              {showSpotlightFeed && (
                <div
                  className="fixed top-0 right-0 h-full w-[350px] bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center shadow-2xl"
                  style={{ minWidth: 320, maxWidth: 400 }}
                >
                  <button
                    className="absolute top-3 right-3 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
                    onClick={() => setShowSpotlightFeed(false)}
                    aria-label="Close Spotlight"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  {/* Pass setRefresh as a prop */}
                  <SpotlightFeedOnly
                    spotlightUploading={spotlightUploading}
                    spotlightUploadError={spotlightUploadError}
                    handleSpotlightUpload={handleSpotlightUpload}
                    refresh={refreshSpotlightFeed}
                    setRefresh={setRefreshSpotlightFeed}
                  />
                </div>
              )}

              {/* Stories Video Feed Popup */}
              {showStoriesFeed && (
                <div
                  className="fixed top-0 right-0 h-full w-[350px] bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center shadow-2xl"
                  style={{ minWidth: 320, maxWidth: 400 }}
                >
                  <button
                    className="absolute top-3 right-3 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
                    onClick={() => setShowStoriesFeed(false)}
                    aria-label="Close Stories"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <StoriesFeedOnly />
                </div>
              )}
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

// --- SpotlightFeedOnly component (vertical scrollable video feed) ---
function SpotlightFeedOnly({ spotlightUploading, spotlightUploadError, handleSpotlightUpload, refresh, setRefresh }) {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/spotlight/public")
      .then(res => res.json())
      .then(data => setVideoList(data.map(v => v.mediaUrl)));
  }, [refresh]);

  // New: file input ref for upload
  const fileInputRef = useRef();

  // New: handle file select
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      alert('Only video files are allowed!');
      return;
    }
    handleSpotlightUpload(file);
    e.target.value = ''; // reset input
  };

  // After successful upload, call setRefresh to trigger refetch
  useEffect(() => {
    if (!spotlightUploading && !spotlightUploadError && setRefresh) {
      setRefresh(r => r + 1);
    }
  }, [spotlightUploading, spotlightUploadError, setRefresh]);

  return (
    <div className="flex flex-col items-center w-full h-full py-4 overflow-y-auto gap-6">
      {/* Plus button for upload */}
      <div className="w-full flex justify-end pr-10 mb-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow transition"
          title="Upload to Spotlight"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{ marginBottom: 8 }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
            <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>
      {/* Show upload status/error */}
      {spotlightUploading && <div className="text-blue-400 text-xs mb-2">Uploading...</div>}
      {spotlightUploadError && <div className="text-red-500 text-xs mb-2">{spotlightUploadError}</div>}
      {/* Video feed */}
      {videoList.map((src, idx) => (
        <div
          key={idx}
          className="w-[260px] h-[460px] rounded-xl overflow-hidden shadow-lg bg-black flex items-center justify-center"
          style={{ minHeight: 320, marginBottom: 16 }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            controls
            style={{ background: "#000" }}
          />
        </div>
      ))}
    </div>
  );
}

// --- StoriesFeedOnly component (NEW, scrollable vertical video feed) ---
function StoriesFeedOnly() {
  // You can use the same video list or a different one for stories
  const videoList = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
    "/videos/video5.mp4",
  ];
  // No need for currentIndex, just scroll
  return (
    <div className="flex flex-col items-center w-full h-full py-4 overflow-y-auto gap-6">
      {videoList.map((src, idx) => (
        <div
          key={idx}
          className="w-[260px] h-[460px] rounded-xl overflow-hidden shadow-lg bg-black flex items-center justify-center"
          style={{ minHeight: 320, marginBottom: 16 }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            controls
            style={{ background: "#000" }}
          />
        </div>
      ))}
    </div>
  );
}