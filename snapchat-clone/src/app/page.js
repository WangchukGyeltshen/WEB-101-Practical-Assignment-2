'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Spotlight from "@/components/spotlight/page"; // import your Spotlight component

export default function Home() {
  const [view, setView] = useState("home"); // "home" or "spotlight"

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar to switch views */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <button onClick={() => setView("home")} className="font-bold">
          Home
        </button>
        <button onClick={() => setView("spotlight")} className="font-bold">
          Spotlight
        </button>
      </nav>

      {view === "home" ? (
        <>
          {/* Home Login Section */}
          <div className="flex flex-col lg:flex-row flex-1">
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

              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md mb-6">
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
                Looking for the app? Get it{' '}
                <Link href="#" className="underline">
                  here
                </Link>.
              </p>
            </div>

            {/* Right side - Visual section */}
            <div className="lg:w-1/2 bg-yellow-400 flex flex-col justify-center items-center p-10">
              <h2 className="text-3xl font-extrabold text-black mb-4 text-center">
                LESS SOCIAL MEDIA.
              </h2>
              <h2 className="text-3xl font-extrabold text-black mb-8 text-center">
                MORE SNAPCHAT.
              </h2>

              <Image
                src="/snapchat-people.png"
                alt="Snapchat people collage"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="w-full bg-black text-white text-center py-3 text-sm mt-auto">
            Are you a parent? Learn what we're doing to help keep{' '}
            <Link href="#" className="underline text-yellow-400">
              Snapchatters safe.
            </Link>
          </footer>
        </>
      ) : (
        <>
          {/* Spotlight Section */}
          <Spotlight />
        </>
      )}
    </main>
  );
}
