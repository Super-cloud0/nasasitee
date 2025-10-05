import { useState } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export default function SearchBar({ onSearch, isSearching = false }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search celestial objects... e.g., 'Show me the red planet with two moons'"
          className="w-full px-6 py-4 pr-14 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-full transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
