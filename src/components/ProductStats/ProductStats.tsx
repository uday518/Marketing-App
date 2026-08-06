const stats = [
  { value: '↓62%', label: 'Less Administrative\nWork' },
  { value: '↓48%', label: 'Fewer Scheduling\nConflicts' },
  { value: '100%', label: 'Stronger Data\nSecurity' },
  { value: '↑2x', label: 'Better Patient\nRecords' },
];

export default function ProductStats() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 lg:text-4xl">
            What Changes When You Switch
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-3 text-4xl font-bold text-primary-500">{stat.value}</div>
              <div className="text-sm leading-snug text-neutral-500 whitespace-pre-line">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-neutral-400">
          Clinics that switch to mysaas typically see faster check-in times, fewer double-bookings,
          and cleaner, more complete patient records within the first month.
        </p>
      </div>
    </section>
  );
}
