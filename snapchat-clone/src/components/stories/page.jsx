import Image from "next/image";
import { useState } from "react";

export default function StoriesPage({ goToChats }) {
  // Add state for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Optionally store token: localStorage.setItem("token", data.token);
        alert("Login successful!");
        if (goToChats) goToChats();
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch {
      setLoginError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      {/* Left: Login box */}
      <div className="w-full lg:w-1/4 p-6 border-r">
        <h2 className="text-xl font-bold mb-4">Log in to Snapchat</h2>
        <p className="text-sm text-gray-600 mb-4">
          Chat, Snap, and video call your friends. Watch Stories and Spotlight, all from your computer.
        </p>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="mb-3 p-3 border border-gray-300 rounded-md w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-3 p-3 border border-gray-300 rounded-md w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <p className="text-blue-500 text-sm mb-3 cursor-pointer">Use phone number instead</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mb-4 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          {loginError && (
            <div className="text-red-500 text-sm mb-2">{loginError}</div>
          )}
        </form>

        <p className="text-sm text-gray-600 mb-2">or continue with downloading Snapchat WebApp</p>

        <a
          href="https://apps.microsoft.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/microsoft-store-badge.png"
            alt="Microsoft Store"
            width={130}
            height={40}
          />
        </a>

        <p className="text-xs mt-4 text-gray-500">
          Looking for the app? Get it <span className="underline cursor-pointer">here</span>.
        </p>
      </div>

      {/* Center: Story preview */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100 p-6">
        <div className="relative">
          <video
            src="/sample-video.mp4"
            controls
            className="rounded-lg max-h-[500px] max-w-full"
          />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full">
            ▶
          </button>
        </div>
      </div>

      {/* Right: More for you */}
      <div className="w-full lg:w-1/4 p-6">
        <h3 className="font-bold mb-4 text-lg">More for you</h3>
        <div className="mb-4">
          <Image
            src="/more1.jpg"
            alt="Story 1"
            width={300}
            height={200}
            className="rounded-md"
          />
          <p className="font-bold mt-2">jakebsweet 🟡</p>
          <p className="text-sm text-gray-500">5h ago</p>
        </div>
        <div>
          <Image
            src="/more2.jpg"
            alt="Story 2"
            width={300}
            height={200}
            className="rounded-md"
          />
          <p className="font-bold mt-2">5-Minute Crafts</p>
        </div>
      </div>
    </div>
  );
}
