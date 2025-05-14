'use client';

import Image from 'next/image';

export default function SnapchatPlusPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Snapchat+</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          A collection of exclusive, experimental, and pre-release features available on Snapchat. $3.99/month.
        </p>
        <button className="mt-6 bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition">
          Subscribe Now
        </button>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-20 py-16 bg-[#1c1c1e]">
        <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              src: '/snapchatplus/badge.png',
              title: 'Snapchat+ Badge',
              desc: 'Show off your support with a special badge on your profile.',
            },
            {
              src: '/snapchatplus/friendsolar.png',
              title: 'Friend Solar Systems',
              desc: 'See which friends you interact with most (Best Friends or Friends).',
            },
            {
              src: '/snapchatplus/storyrewatch.png',
              title: 'Story Rewatch Indicator',
              desc: 'See how many friends rewatch your stories.',
            },
            {
              src: '/snapchatplus/customicons.png',
              title: 'Custom App Icons',
              desc: 'Change the Snapchat app icon to match your vibe.',
            },
            {
              src: '/snapchatplus/backgrounds.png',
              title: 'Chat Wallpapers',
              desc: 'Customize your chats with fun wallpapers.',
            },
            {
              src: '/snapchatplus/gifting.png',
              title: 'Gift Snapchat+',
              desc: 'Share the love by gifting a subscription to friends.',
            },
          ].map(({ src, title, desc }) => (
            <div key={title} className="bg-[#2a2a2e] p-6 rounded-xl text-center">
              <Image src={src} alt={title} width={100} height={100} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="text-center px-6 py-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to Explore More?</h2>
        <button className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition">
          Get Snapchat+
        </button>
      </section>
    </main>
  );
}
