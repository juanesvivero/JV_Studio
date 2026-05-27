'use client';

import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`faqItem ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="faqQuestionButton" aria-expanded={isOpen}>
        <span>{question}</span>
        <svg
          className="faqChevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={`faqAnswerWrapper ${isOpen ? 'open' : ''}`}>
        <div className="faqAnswerContent">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
