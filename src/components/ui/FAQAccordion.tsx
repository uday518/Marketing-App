'use client';

import { useState, type ReactNode } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  renderAnswer?: (item: FAQItem) => ReactNode;
}

export default function FAQAccordion({
  items,
  className = '',
  renderAnswer,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-[#D9DCE5] bg-white transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-5 py-[18px] text-left text-base text-[#1A2038] transition-colors hover:text-[#0D7A97]"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span
                className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center text-lg transition-transform duration-200 ${
                  isOpen ? 'rotate-45 text-[#0D7A97]' : 'text-[#0D7A97]'
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-[#D9DCE5] px-5 py-4 text-sm leading-relaxed text-[#2C3350]">
                {renderAnswer ? renderAnswer(item) : item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
