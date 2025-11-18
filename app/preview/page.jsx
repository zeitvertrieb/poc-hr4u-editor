'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Navigation/Header"; 
import PreviewDoc from "@/components/Preview/PreviewDoc"; 
import { STORAGE_KEY } from '@/lib/constants';

export default function ClientPreviewPage() {
  const router = useRouter();

  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      
      if (savedData) {
        setContent(JSON.parse(savedData));
      } else {
        console.warn("No data in localStorage. Redirecting to upload.");
        router.push('/');
      }
    } catch (err) {
      console.error("Error loading data:", err);
      localStorage.removeItem(STORAGE_KEY);
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handleStepClick = (stepId) => {
    if (stepId === 2) {
      router.push('/content');
    } else if (stepId === 3) {
      router.push('/content?edit=true');
    }
  };

  const handlePrintClick = () => {
    window.print();
  };

  if (isLoading || !content) {
    return (
      <div className="flex flex-col h-screen items-center">
        <Header activeStep={4} />
        <main className="flex-1 flex items-center justify-center">
          <p>Lade Vorschau...</p>
        </main>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <Header
        activeStep={4}
        onStepClick={handleStepClick}
        onHeaderButtonClick={handlePrintClick}
        headerButtonText="Drucken"
        className="sticky top-0 z-10 "
      />
      <main className="flex-1 w-full flex justify-center overflow-y-auto">
        <PreviewDoc data={content}/>
      </main>
    </div>
  );
}