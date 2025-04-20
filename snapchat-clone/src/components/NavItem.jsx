export default function NavItem({ icon, label, badge, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-2 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${
        active ? 'text-black font-bold border-b-2 border-black pb-1' : 'text-gray-700'
      }`}
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