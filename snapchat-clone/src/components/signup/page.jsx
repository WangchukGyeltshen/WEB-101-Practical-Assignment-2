'use client';

import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful!");
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <h2 className="text-3xl font-bold mb-6">Create a Snapchat Account</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Sign Up
        </button>
        {message && <p className="text-sm text-center mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  );
}