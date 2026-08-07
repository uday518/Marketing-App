'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. Upgrade or downgrade at any time from your dashboard.',
  },
  {
    question: 'What happens after the free trial?',
    answer: 'Choose a paid plan or your account is paused. Data is kept for 30 days.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes. Annual plans receive a 20% discount.',
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="rounded-lg border border-border-default"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <h3 className="font-semibold text-text-heading">{faq.question}</h3>
              <span
                className={`ml-4 shrink-0 text-lg transition-transform duration-200 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6">
                <p className="text-sm text-text-muted">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
