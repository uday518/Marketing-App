import type { ComponentType, ReactNode } from 'react';

export interface IconProps {
  className?: string;
}

interface BaseIconProps extends IconProps {
  strokeWidth?: number;
  children: ReactNode;
}

function Icon({ className, strokeWidth = 1.5, children }: BaseIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const SearchIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);

export const ArrowRightIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

export const ArrowLeftIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </Icon>
);

export const ChevronDownIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const CheckIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const RocketIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Icon>
);

export const ClinicIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
    <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
    <path d="M8 7h.01" />
    <path d="M16 7h.01" />
    <path d="M12 7h.01" />
    <path d="M12 11h.01" />
    <path d="M16 11h.01" />
    <path d="M8 11h.01" />
  </Icon>
);

export const UsersIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const UploadIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Icon>
);

export const PatientIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </Icon>
);

export const CalendarIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </Icon>
);

export const ClockIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

export const DocsIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <line x1="10" x2="8" y1="9" y2="9" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
  </Icon>
);

export const PencilIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Icon>
);

export const ChartIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h2" />
    <path d="M8 17h2" />
    <path d="M14 13h2" />
    <path d="M14 17h2" />
  </Icon>
);

export const ShieldIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

export const MenuIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </Icon>
);

export const CloseIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className} strokeWidth={2}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

export const ChatIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </Icon>
);

export const BellIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </Icon>
);

export const FileTextIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </Icon>
);

export const HelpIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

export const NewspaperIcon: ComponentType<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="12" y2="16" />
  </Icon>
);