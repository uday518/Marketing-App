'use client';

import { SearchIcon } from './icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  ariaLabel = 'Search',
  className = 'mx-auto mb-8 max-w-md',
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-disabled" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full rounded-full border border-border-default bg-bg-card py-3 pl-11 pr-4 text-sm text-text-heading placeholder:text-text-disabled focus:border-border-focus focus:outline-none"
      />
    </div>
  );
}