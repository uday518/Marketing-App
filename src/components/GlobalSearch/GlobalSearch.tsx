'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/ui/icons';

type SearchResult = {
  id: string;
  type: 'page' | 'patient' | 'staff';
  label: string;
  href: string;
  sublabel?: string;
};

const STATIC_PAGES: SearchResult[] = [
  { id: 'page-dashboard', type: 'page', label: 'Dashboard', href: '/dashboard', sublabel: 'View overview & stats' },
  { id: 'page-patients', type: 'page', label: 'Patients', href: '/patients', sublabel: 'Manage patient records' },
  { id: 'page-staff', type: 'page', label: 'Staff Management', href: '/staff', sublabel: 'Manage clinic staff' },
  { id: 'page-settings', type: 'page', label: 'Settings', href: '/settings', sublabel: 'Clinic preferences' },
];

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState<SearchResult[]>([]);
  const [staff, setStaff] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch patients and staff on mount for quick client-side filtering
    const fetchData = async () => {
      try {
        const [patientsRes, staffRes] = await Promise.all([
          fetch('/api/patients').catch(() => null),
          fetch('/api/staff').catch(() => null),
        ]);

        if (patientsRes?.ok) {
          const data = await patientsRes.json();
          setPatients(
            data.map((p: any) => ({
              id: `patient-${p._id}`,
              type: 'patient',
              label: p.fullName,
              href: `/patients/${p._id}`,
              sublabel: p.email || p.phone || 'Patient',
            }))
          );
        }

        if (staffRes?.ok) {
          const data = await staffRes.json();
          if (data.staff) {
            setStaff(
              data.staff.map((s: any) => ({
                id: `staff-${s._id}`,
                type: 'staff',
                label: s.name,
                href: '/staff',
                sublabel: s.role || 'Staff',
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to fetch search data', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allResults = [...STATIC_PAGES, ...patients, ...staff];
  
  const filteredResults = query
    ? allResults.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.sublabel?.toLowerCase().includes(query.toLowerCase()) ||
          r.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : STATIC_PAGES;

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md z-50">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-disabled" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search pages, patients, staff..."
          className="w-full rounded-lg border border-border-default bg-white py-2 pl-9 pr-4 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border border-border-default bg-white shadow-lg">
          {filteredResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-text-muted">
              No results found for "{query}"
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-2">
              {filteredResults.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelect(result.href)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-heading">{result.label}</p>
                      {result.sublabel && (
                        <p className="text-xs text-text-muted">{result.sublabel}</p>
                      )}
                    </div>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                      {result.type}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
