export default function NavItem({ icon, label, badge }) {
  return (
    <div className="relative flex items-center gap-2 text-gray-700 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:text-black">
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