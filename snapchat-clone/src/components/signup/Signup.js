import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup({ onBack }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Simple validation
  const isBirthdayValid =
    Number(month) >= 1 &&
    Number(month) <= 12 &&
    Number(day) >= 1 &&
    Number(day) <= 31 &&
    year.length === 4 &&
    Number(year) >= 1900 &&
    Number(year) <= 2100;

  const canSubmit =
    firstName &&
    username &&
    password &&
    isBirthdayValid &&
    agreed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email: username,
          password,
          birthday: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful!");
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch {
      setMessage("Network error.");
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-yellow-300 rounded-full w-10 h-10 flex items-center justify-center mb-2">
          <Image src="/snapchat-logo.svg" alt="Snapchat" width={45} height={45} />
        </div>
        <h1 className="text-3xl font-bold mb-1">Sign Up</h1>
        <span className="text-gray-600 text-sm mb-2">Step 1 of 3</span>
      </div>
      <form className="w-full" autoComplete="off" onSubmit={handleSubmit}>
        {/* Name fields */}
        <div className="w-full mb-2">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="First name"
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Last name (optional)"
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Birthday fields */}
        <div className="w-full mb-2 mt-3">
          <label className="block text-sm font-semibold mb-1">Birthday</label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Month"
              min={1}
              max={12}
              className="w-1/3 p-3 border border-gray-300 rounded-md text-sm"
              value={month}
              onChange={e => setMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
            />
            <input
              type="number"
              placeholder="Day"
              min={1}
              max={31}
              className="w-1/3 p-3 border border-gray-300 rounded-md text-sm"
              value={day}
              onChange={e => setDay(e.target.value.replace(/\D/g, "").slice(0, 2))}
            />
            <input
              type="number"
              placeholder="Year"
              min={1900}
              max={2100}
              className="w-1/3 p-3 border border-gray-300 rounded-md text-sm"
              value={year}
              onChange={e => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
            />
          </div>
          <div className="flex gap-3 mt-1">
            <span className="w-1/3 text-xs text-red-500">
              {month && !(Number(month) >= 1 && Number(month) <= 12) && "Invalid"}
            </span>
            <span className="w-1/3 text-xs text-red-500">
              {day && !(Number(day) >= 1 && Number(day) <= 31) && "Invalid"}
            </span>
            <span className="w-1/3 text-xs text-red-500">
              {year && !(year.length === 4 && Number(year) >= 1900 && Number(year) <= 2100) && "Invalid"}
            </span>
          </div>
        </div>
        {/* Username */}
        <div className="w-full mb-2 mt-3">
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-md text-sm"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <span className="text-xs text-gray-500 mt-1 block">
            You can change this later
          </span>
        </div>
        {/* Password */}
        <div className="w-full mb-2 mt-3">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter a secure password"
              className="w-full p-3 border border-gray-300 rounded-md text-sm pr-10"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye open icon
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <ellipse cx="10" cy="10" rx="8" ry="6" stroke="#bdbdbd" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill="#bdbdbd" />
                </svg>
              ) : (
                // Eye closed icon
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <ellipse cx="10" cy="10" rx="8" ry="6" stroke="#bdbdbd" strokeWidth="2" />
                  <line x1="5" y1="15" x2="15" y2="5" stroke="#bdbdbd" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill="#bdbdbd" />
                </svg>
              )}
            </button>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">
            Password must be at least 8 characters
          </span>
        </div>
        {/* Terms + Tick */}
        <div className="w-full flex items-start gap-2 text-xs text-gray-600 mt-3 mb-4">
          <button
            type="button"
            aria-label={agreed ? "Uncheck" : "Check"}
            className={`w-5 h-5 flex items-center justify-center border rounded ${agreed ? "border-blue-500 bg-blue-500" : "border-gray-400 bg-white"} transition`}
            onClick={() => setAgreed(v => !v)}
            tabIndex={0}
          >
            {agreed && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8.5l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <span>
            By tapping "Agree and Continue" below, you agree to the{" "}
            <Link href="#" className="text-blue-600 underline">Terms of Service</Link>
            {" "}and acknowledge that you have read the{" "}
            <Link href="#" className="text-blue-600 underline">Privacy Policy</Link>.
          </span>
        </div>
        {/* Agree button */}
        <button
          type="submit"
          className={`w-full font-semibold py-3 rounded-full mb-2 ${
            canSubmit && !submitting
              ? "bg-yellow-400 text-black hover:bg-yellow-300 transition"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!canSubmit || submitting}
        >
          {submitting ? "Submitting..." : "Agree and Continue"}
        </button>
        {message && (
          <div className="text-center text-sm mt-2 text-gray-700">{message}</div>
        )}
      </form>
      {/* Footer links */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 border-t pt-4 gap-2 text-xs text-gray-600">
        <div>
          Already have an account?{" "}
          <button
            className="text-blue-600 underline"
            onClick={onBack}
          >
            Log In
          </button>{" "}
          <span className="mx-1">|</span>
          <Link href="#" className="text-blue-600 underline">Forgot Password</Link>
        </div>
        <div>
          Advertising on Snapchat?{" "}
          <Link href="#" className="text-blue-600 underline">Sign Up for Ads Manager</Link>
        </div>
      </div>
    </div>
  );
}
