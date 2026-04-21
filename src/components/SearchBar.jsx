import { useState } from 'react';
import { DEFAULT_DOT } from '../data/topCarriers';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const dot = value.trim() || DEFAULT_DOT;
    onSearch(dot);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`USDOT number (e.g. ${DEFAULT_DOT})`}
        className="flex-1 rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:border-blue-500 focus:outline-none"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded border border-blue-600 bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Loading…' : 'Look up'}
      </button>
    </form>
  );
}
