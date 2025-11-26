import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { Button } from './Button';

interface AidaProps {
  onCtaClick: () => void;
}

export const Aida: React.FC<AidaProps> = ({ onCtaClick }) => {
  const { aida } = CONTENT;

  return (
    <Section className="bg-gradient-to-b from-navy-900 to-navy-800">
      <div className="flex flex-col gap-8 md:gap-12 w-full max-w-4xl mx-auto text-center">
        {aida.steps.map((step, index) => (
          <p 
            key={index} 
            className="text-lg md:text-2xl leading-relaxed font-bold text-white"
          >
            {step.text}
          </p>
        ))}
      </div>

      <div className="mt-12 md:mt-16">
        <Button onClick={onCtaClick}>{aida.cta}</Button>
      </div>
    </Section>
  );
};