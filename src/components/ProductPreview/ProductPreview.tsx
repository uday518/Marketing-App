'use client';

import { useState } from 'react';

const tabs = [
  'Appointment Workspace',
  'Queue Board',
  'Clinical Encounter',
  'Patient Registry',
];

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-neutral-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 lg:text-4xl">
            See the Platform in Action
          </h2>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 border-b border-neutral-200">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'border-b-2 border-brand-primary text-brand-primary'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="flex h-96 items-center justify-center rounded-2xl bg-white shadow-sm">
          <span className="text-sm text-neutral-400">
            {tabs[activeTab]} screenshot
          </span>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#gallery"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            View Full Screenshot Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
