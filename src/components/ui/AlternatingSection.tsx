interface Section {
  title: string;
  description: string;
  bullets: string[];
  screenshot: string;
  reversed: boolean;
}

interface AlternatingSectionProps {
  sections: Section[];
}

export default function AlternatingSection({ sections }: AlternatingSectionProps) {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`flex flex-col items-center gap-12 py-16 lg:flex-row ${
              section.reversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="flex w-full flex-1 items-center justify-center">
              <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl bg-secondary-100 lg:h-80">
                <span className="text-sm text-neutral-400">{section.screenshot}</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-start gap-6">
              <h3 className="text-2xl font-bold text-text-heading">{section.title}</h3>
              <p className="text-base leading-relaxed text-text-muted">{section.description}</p>
              <ul className="space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm text-text-body">
                    <span className="text-brand-primary">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
