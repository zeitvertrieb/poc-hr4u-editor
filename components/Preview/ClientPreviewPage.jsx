'use client'; // <-- This is the key

import { useRouter } from 'next/navigation';
import PreviewDoc from "@/components/Preview/PreviewDoc";
import Header from "@/components/Header";

// This component receives the 'data' as a prop
export default function ClientPreviewPage({ data }) {
  const router = useRouter();

  // Logic for the stepper navigation
  const handleStepClick = (stepId) => {
    if (stepId === 2) {
      router.push('/content'); // Go to view mode
    } else if (stepId === 3) {
      router.push('/content?edit=true'); // Go back to edit mode
    }
    // If stepId is 4, do nothing (already on this page)
  };

  // Logic for the "Print" button
  const handlePrintClick = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        activeStep={4}
        onStepClick={handleStepClick}
        onHeaderButtonClick={handlePrintClick}
        headerButtonText="Drucken"
      />
      <main className="flex-1 w-full max-w-7xl mx-auto flex align-center justify-center">
        {/* Pass the data prop down to your PreviewDoc */}
        <PreviewDoc data={data}/>
      </main>
    </div>
  );
}