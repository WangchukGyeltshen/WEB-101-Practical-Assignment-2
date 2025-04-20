import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar"; 

export default function Home() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

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

        {/* Footer */}
        <footer className="w-full bg-black text-white text-center py-3 text-sm fixed bottom-0">
          Are you a parent? Learn what we're doing to help keep{' '}
          <Link href="#" className="underline text-yellow-400">
            Snapchatters safe.
          </Link>
        </footer>
      </main>
    </>
  );
}