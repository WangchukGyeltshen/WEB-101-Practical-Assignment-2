// components/NavItem.jsx
"use client"; // This makes the component a client-side component

export default function NavItem({ icon, label, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center text-gray-700 hover:text-black transition-all duration-200 cursor-pointer"
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded">
          {badge}
        </span>
      )}
    </div>
  );
}