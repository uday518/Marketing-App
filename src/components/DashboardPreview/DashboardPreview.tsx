const schedule = [
  { time: '09:00', name: 'Sita Rai', type: 'Checkup', status: 'In Room' },
  { time: '09:30', name: 'Ram Karki', type: 'Cleaning', status: 'Waiting' },
  { time: '10:00', name: 'Binita Shrestha', type: 'Crown', status: 'Waiting' },
  { time: '10:30', name: 'Kumar Bhandari', type: 'X-Ray', status: 'Waiting' },
];

const stats = [
  { value: '14', label: 'Patients Today' },
  { value: '3', label: 'Pending' },
  { value: '$2,840', label: 'Revenue' },
];

const navItems = [
  'Dashboard',
  'Patients',
  'Schedule',
  'Clinical',
  'Staff',
  'Reports',
  'Settings',
];

export default function DashboardPreview() {
  return (
    <div className="flex h-[398px] w-full max-w-[611px] overflow-hidden rounded-2xl border border-border-default bg-[#f2f7fa]">
      <div className="relative flex w-[160px] shrink-0 flex-col gap-[29px] rounded-l-2xl bg-brand-logo px-6 py-[54px] text-xs">
        <span className="absolute left-0 top-[52px] h-5 w-1 rounded-l-2xl rounded-r-full bg-white" />
        {navItems.map((item, index) => (
          <p key={item} className={index === 0 ? 'font-semibold text-white' : 'text-[#b2e5e5]'}>
            {item}
          </p>
        ))}
      </div>

      <div className="flex-1 p-4 pr-3">
        <p className="text-sm font-semibold text-text-heading">Good morning, Dr. Sharma 👋</p>
        <p className="mt-1 text-[10px] text-text-muted">Tuesday, June 28 · 14 appointments today</p>

        <div className="mt-4 grid max-w-[333px] grid-cols-[88px_88px_96px] gap-7">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-[61px] flex-col justify-center rounded-lg border border-border-default bg-white px-3 py-2"
            >
              <p className="text-xl font-bold text-text-heading">{stat.value}</p>
              <p className="text-[9px] text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[13px] font-semibold text-text-heading">Today&apos;s Schedule</p>
        <div className="mt-6 flex flex-col gap-6">
          {schedule.map((item) => (
            <div key={item.time} className="flex items-center justify-between">
              <p className="text-xs text-text-body">
                {item.time} &nbsp; {item.name} — {item.type}
              </p>
              <span
                className={`rounded-pill px-2.5 py-1 text-[9px] font-semibold ${
                  item.status === 'In Room'
                    ? 'bg-success-500 text-white'
                    : 'bg-neutral-200 text-text-muted'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
