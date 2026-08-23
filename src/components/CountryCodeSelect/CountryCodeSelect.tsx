'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/icons';

export interface CountryCodeOption {
  code: string;
  name: string;
}

export default function CountryCodeSelect({
  options,
  value,
  onChange,
}: {
  options: CountryCodeOption[];
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((option) => option.code === value) ?? options[0];

  return (
    <div ref={ref} className="relative w-24 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-1 rounded-xl border bg-neutral-50 px-3 py-3 text-sm font-medium text-text-heading transition-all duration-200 hover:border-brand-primary hover:bg-white hover:shadow-md ${
          open ? 'border-brand-primary bg-white ring-2 ring-primary-100' : 'border-neutral-200'
        }`}
      >
        <span>{selected.code}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 text-text-muted transition-transform duration-200 ${
            open ? 'rotate-180 text-brand-primary' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 z-20 mt-2 max-h-60 w-64 overflow-auto rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl"
        >
          {options.map((option) => {
            const isActive = option.code === value;
            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(option.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-150 hover:bg-brand-primary hover:text-white ${
                  isActive ? 'bg-secondary-100 font-medium text-text-heading' : 'text-text-heading'
                }`}
              >
                <span>{option.name}</span>
                <span
                  className={`text-xs tabular-nums transition-colors ${
                    isActive ? 'text-brand-primary' : 'text-text-muted'
                  }`}
                >
                  {option.code}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}