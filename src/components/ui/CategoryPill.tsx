interface CategoryPillProps {
  label: string;
  active?: boolean;
  className?: string;
}

export default function CategoryPill({ label, active = false, className = '' }: CategoryPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold leading-none transition-colors ${
        active
          ? 'bg-[#0D7A97] text-white'
          : 'bg-[#EEF0F4] text-[#2C3350] hover:bg-neutral-200'
      } ${className}`}
    >
      {label}
    </span>
  );
}