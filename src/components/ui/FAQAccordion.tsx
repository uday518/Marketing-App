'use client';

import { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors hover:border-primary-200"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4.5 text-left text-sm font-semibold text-text-heading transition-colors hover:text-primary-600 sm:text-base"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span
                className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-transform duration-200 ${
                  isOpen
                    ? 'rotate-180 bg-primary-100 text-primary-700 font-bold'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-neutral-100 px-6 py-4 text-sm leading-relaxed text-text-muted">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
