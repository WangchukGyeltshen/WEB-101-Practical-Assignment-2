import React from "react";

const MOCK_RESULTS = {
  users: [
    { name: "Lhundup Dorji", username: "lhundup", img: "/avatars/avatar1.png" },
    { name: "Tashi Wangchuk", username: "tashi_w", img: "/avatars/avatar2.png" },
    { name: "Wangchuk", username: "wangchuk", img: "/avatars/avatar3.png" },
    { name: "Sonam Choden", username: "sonamc", img: "/avatars/avatar4.png" },
    { name: "Yeshey Zhennue", username: "Zhennue", img: "/avatars/avatar5.png" }
  ],
  subscribe: [
    { name: "Md Samsuzzoha", username: "dorji_australia", img: "/avatars/avatar6.png" },
    { name: "Baylen Dupree", username: "baylendupree", img: "/avatars/avatar7.png" },
    { name: "Karma Dema", username: "karmadema", img: "/avatars/avatar8.png" }
  ]
};

function filterResults(list, query) {
  if (!query) return list;
  const q = query.toLowerCase();
  return list.filter(
    item =>
      item.name.toLowerCase().includes(q) ||
      item.username.toLowerCase().includes(q)
  );
}

export default function SearchResultsPage({ query }) {
  const filteredUsers = filterResults(MOCK_RESULTS.users, query);
  const filteredSubscribe = filterResults(MOCK_RESULTS.subscribe, query);

  return (
    <div className="w-full flex flex-col items-center bg-[#18181a] min-h-screen pt-10">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-yellow-400 rounded-full p-3">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#FFF700"/><path d="M16.32 15.9l-2.82-2.82A4.48 4.48 0 1014.5 14.5l2.82 2.82a1 1 0 001.41-1.41zM6.5 10.5a4 4 0 118 0 4 4 0 01-8 0z" fill="#18181a"/></svg>
          </div>
          <span className="text-yellow-400 text-3xl font-bold">
            {query ? query.charAt(0).toUpperCase() + query.slice(1) : "Search"}
          </span>
        </div>
        <div className="text-gray-400 text-base mb-2">
          Discover your favourite Profiles, Lenses, Filters and Spotlight videos related to <span className="font-semibold">{query}</span>.
        </div>
        <div className="text-gray-500 text-xs mb-6">Last updated 6/12/2025</div>
        <div className="flex gap-8 border-b border-gray-700 pb-2 mb-4">
          <span className="text-white font-semibold border-b-2 border-yellow-400 pb-1">Top Results</span>
          <span className="text-gray-400">Users</span>
          <span className="text-gray-400">Subscribe</span>
        </div>
        {/* Users */}
        <div className="mb-4">
          <div className="text-gray-400 text-sm mb-1">Users &gt;</div>
          {filteredUsers.length === 0 && (
            <div className="text-gray-500 text-xs mb-2">No users found.</div>
          )}
          {filteredUsers.map((user) => (
            <div key={user.username} className="bg-[#232325] rounded-lg p-3 flex items-center gap-3 mb-2">
              <img
                src={user.img}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-gray-400 text-xs">{user.username}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Subscribe */}
        <div>
          <div className="text-gray-400 text-sm mb-1">Subscribe &gt;</div>
          {filteredSubscribe.length === 0 && (
            <div className="text-gray-500 text-xs mb-2">No subscriptions found.</div>
          )}
          {filteredSubscribe.map((sub) => (
            <div key={sub.username} className="bg-[#232325] rounded-lg p-3 flex items-center gap-3 mb-2">
              <img
                src={sub.img}
                alt={sub.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{sub.name}</div>
                <div className="text-gray-400 text-xs">{sub.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
