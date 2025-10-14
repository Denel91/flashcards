'use client';

import { useState } from 'react';

const FILTERS = [
  { id: 'all', label: 'Tutte', icon: '⭐' },
  { id: 'not-studied', label: 'Non studiate', icon: '📚' },
  { id: 'needs-review', label: 'Da rivedere', icon: '🔄' },
  { id: 'recent', label: 'Recenti', icon: '🕒' },
];

export default function FlashcardFilters({ onSearch, onFilter, resultsCount = null, statusMessage = '' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    onFilter(filterType);
  };

  return (
    <div className="mb-8">
      {/* Barra di ricerca moderna */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cerca tra le flashcards..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
        />
        <span className="absolute left-3 top-2.5 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>
      {/* Filtri come pillole orizzontali sotto la barra di ricerca */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => handleFilterClick(f.id)}
            className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all whitespace-nowrap
              ${activeFilter === f.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
            {activeFilter === f.id && resultsCount !== null && (
              <span className="ml-2 bg-white text-blue-600 rounded-full px-2 text-xs font-bold">{resultsCount}</span>
            )}
          </button>
        ))}
      </div>
      {/* Messaggio di stato */}
      {statusMessage && (
        <div className="text-sm text-gray-500 mt-2 text-center">{statusMessage}</div>
      )}
    </div>
  );
}
