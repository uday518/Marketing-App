const securityFeatures = [
  { icon: '🛡️', label: 'Data Encrypted' },
  { icon: '🔐', label: 'Role-Based Access' },
  { icon: '🏗️', label: 'Tenant Isolation' },
  { icon: '🔑', label: 'Session Management' },
  { icon: '📋', label: 'Audit-Ready Records' },
];

export default function Security() {
  return (
    <section className="bg-bg-dark px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
          Built on a Secure, Multi-Tenant Foundation
        </h2>
        <p className="mb-10 mx-auto max-w-2xl text-lg text-neutral-300">
          Tenant isolation, role-based access control, encrypted data at rest and in transit, and Argon2
          password hashing protect every clinic on the platform.
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          {securityFeatures.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-neutral-300"
            >
              <span>{feature.icon}</span>
              {feature.label}
            </div>
          ))}
        </div>

        <a
          href="/security"
          className="inline-block rounded-md border-[1.5px] border-neutral-600 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          Learn More About Security
        </a>
      </div>
    </section>
  );
}
