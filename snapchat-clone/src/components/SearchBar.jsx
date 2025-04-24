import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
      <FiSearch className="mr-2 text-gray-600" />
      <span className="text-gray-600 text-sm">Search</span>
    </div>
  );
}