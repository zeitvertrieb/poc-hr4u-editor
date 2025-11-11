import React from 'react';

// Define the steps
const steps = [
  { id: 1, name: 'Upload' },
  { id: 2, name: 'Ansehen' },
  { id: 3, name: 'Bearbeiten' },
  { id: 4, name: 'Export' }
];

// NEW PROP: onStepClick. This function will be provided by the parent.
export default function Stepper({ activeStep, onStepClick }) {
  
  // Stepper is only clickable if not on step 1 (Upload)
  const isClickable = activeStep > 1;

  return (
    <nav aria-label="Workflow-Schritte">
      <ol className="flex items-center space-x-4 md:space-x-6">
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          
          // Define what happens when a step is clicked
          const handleClick = () => {
            // Only fire if clickable and the step is not the upload step
            if (isClickable && onStepClick && step.id > 1) {
              onStepClick(step.id);
            }
          };

          // Base classes for the label
          let labelClasses = `mt-2 text-xs md:text-sm ${
            isActive ? 'text-primary font-bold' : 'text-gray-500 font-medium'
          }`;
          
          // Add cursor pointer if clickable
          if (isClickable && step.id > 1) {
             labelClasses += ' cursor-pointer hover:text-primary';
          }

          return (
            <li 
              key={step.id} 
              className="flex flex-col" 
              onClick={handleClick}
            >
              {/* The indicator bar */}
              <div
                className={`h-1.5 w-full min-w-[50px] md:min-w-[80px] rounded ${
                  isActive ? 'bg-primary' : 'bg-gray-200'
                } ${isClickable && step.id > 1 ? 'cursor-pointer' : ''}`}
                aria-hidden="true"
              />
              
              {/* The label */}
              <span className={labelClasses}>
                {`${step.id} ${step.name}`}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}