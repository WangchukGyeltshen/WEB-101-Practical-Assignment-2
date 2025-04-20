export default function NavItem({ icon, label, badge, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-2 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${
        active ? 'text-black font-bold border-b-2 border-black pb-1' : 'text-gray-700'
      }`}
    >
      {icon}
      {badge && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
