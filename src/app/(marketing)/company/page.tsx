import Breadcrumb from '@/components/ui/Breadcrumb';

const values = [
  {
    title: 'Clarity Over Complexity',
    description: 'We build tools clinics can actually understand and use.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" />
      </svg>
    ),
  },
  {
    title: 'Trust by Design',
    description: 'Security and data isolation are never an afterthought.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Built With Clinics',
    description: 'Every feature starts from a real workflow, not a guess.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Built to Scale',
    description: 'From one chair to twenty clinics, without switching systems.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const leadership = [
  { initials: 'AR', name: 'Alex Rivera', role: 'Co-Founder & CEO' },
  { initials: 'PS', name: 'Priya Sharma', role: 'Co-Founder & CTO' },
  { initials: 'MW', name: 'Marcus Webb', role: 'Head of Product' },
];

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <div className="px-6 pt-6 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Company', href: '/company' },
              { label: 'About' },
            ]}
          />
        </div>
      </div>

      <section className="px-6 pb-16 pt-8 sm:px-20">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="text-[38px] font-bold leading-[120%] text-[#1A2038]">
            Building the Operating System for Modern Dental Practices
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[160%] text-[#2C3350]">
            We started mysaas to give dental clinics — from single practices to multi-location chains
            — one platform that actually fits how they work.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex h-[340px] items-center justify-center rounded-2xl bg-[#EEF0F4]">
              <p className="text-sm text-[#636D8C]">Team / clinic photography placeholder</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-[#0D7A97]">Our Story</span>
              <h2 className="text-[22px] font-bold leading-[130%] text-[#1A2038]">
                Built by People Who Understood the Problem
              </h2>
              <p className="text-[15px] leading-[160%] text-[#2C3350]">
                mysaas began after watching dental clinics struggle with disconnected tools — paper
                schedules, siloed patient records, and software built for enterprise chains that small
                practices never needed. We set out to build something simpler: one system that scales
                from a single chair to a full dental group, without losing the clarity a small clinic
                depends on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#D9DCE5] bg-white p-7">
              <h3 className="text-lg font-bold text-[#1A2038]">Our Mission</h3>
              <p className="mt-3 text-sm leading-[160%] text-[#2C3350]">
                Give every dental clinic — regardless of size — the tools to run smoother, more
                organized, and more secure operations.
              </p>
            </div>
            <div className="rounded-2xl border border-[#D9DCE5] bg-white p-7">
              <h3 className="text-lg font-bold text-[#1A2038]">Our Vision</h3>
              <p className="mt-3 text-sm leading-[160%] text-[#2C3350]">
                A world where running the business side of dental care never gets in the way of caring
                for patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1A2038]">
            What We Value
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col gap-3 rounded-2xl border border-[#D9DCE5] bg-white p-6"
              >
                <div className="text-[#1A2038]">{value.icon}</div>
                <h3 className="text-base font-semibold text-[#1A2038]">{value.title}</h3>
                <p className="text-[13px] leading-[145%] text-[#636D8C]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="mb-4 text-center text-[26px] font-bold text-[#1A2038]">
            Leadership
          </h2>
          <p className="mb-10 text-center text-sm text-[#636D8C]">
            Sample placeholder — to be replaced with real team profiles.
          </p>
          <div className="flex justify-center gap-16">
            {leadership.map((person) => (
              <div key={person.initials} className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF0F4] text-lg font-semibold text-[#1A2038]">
                  {person.initials}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#1A2038]">{person.name}</p>
                  <p className="text-xs text-[#636D8C]">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
