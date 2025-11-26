import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { Button } from './Button';
import { Layers } from 'lucide-react';

interface SolutionProps {
  onCtaClick: () => void;
}

export const Solution: React.FC<SolutionProps> = ({ onCtaClick }) => {
  const { solution } = CONTENT;

  return (
    <Section id="solution">
      <div className="mb-8 flex justify-center text-brand-green">
        <Layers size={64} strokeWidth={1} />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
        {solution.heading}
      </h2>
      
      <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-12">
        {solution.description}
      </p>

      <Button onClick={onCtaClick} variant="primary">
        {solution.cta}
      </Button>
    </Section>
  );
};
