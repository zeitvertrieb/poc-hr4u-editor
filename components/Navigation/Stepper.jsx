import React from 'react';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Upload', href: '/' },
  { id: 2, name: 'Ansehen' },
  { id: 3, name: 'Bearbeiten' },
  { id: 4, name: 'Export' },
];

export default function Stepper({ activeStep, onStepClick }) {
  const isClickable = activeStep > 1;

  return (
    <nav aria-label="Workflow-Schritte">
      <ol className="flex items-center space-x-4 md:space-x-6">
        {steps.map((step) => {
          const isActive = step.id === activeStep;

          const handleClick = () => {
            if (isClickable && onStepClick && step.id > 1) {
              onStepClick(step.id);
            }
          };

          let labelClasses = `text-xs md:text-sm text-primary font-bold`;

          let barClasses = `h-1 w-full min-w-[50px] md:min-w-[80px] border 
          ${isActive ? 'bg-surface-violet border-surface-violet' : 'bg-text-disabled border-text-disabled'}
        `;

          if (step.id === 1) {
            labelClasses += ' cursor-pointer hover:text-interactive-hover';
            barClasses += ' cursor-pointer';
          } else if (isClickable) {
            labelClasses += ' cursor-pointer hover:text-interactive-hover';
            barClasses += ' cursor-pointer';
          }

          if (step.id === 1) {
            return (
              <li key={step.id}>
                <Link href={step.href} className="flex flex-col">
                  <div className={barClasses} aria-hidden="true" />
                  <span className={labelClasses}>
                    <span className="text-surface-violet text-2xl font-zilla-slab">{`${step.id}`}</span>{' '}
                    {`${step.name}`}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={step.id} className="flex flex-col" onClick={handleClick}>
              <div className={barClasses} aria-hidden="true" />
              <span className={labelClasses}>
                <span className="text-surface-violet text-2xl font-zilla-slab">{`${step.id}`}</span>{' '}
                {`${step.name}`}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
