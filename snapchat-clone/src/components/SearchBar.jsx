import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

export default function SearchBar({ setView }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && setView) {
      setView('search', query);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form
        className="flex items-center bg-gray-100 rounded-full px-4 py-2"
        onSubmit={handleSearch}
        autoComplete="off"
      >
        <FiSearch className="mr-2 text-gray-600" />
        <input
          className="bg-transparent outline-none text-gray-600 text-sm flex-1"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}