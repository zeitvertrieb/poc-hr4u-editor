'use client'; 

import Header from "@/components/Header";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EditorSidebar from '@/components/EditorSidebar'; // <-- 1. Import Sidebar
import EducationSection from "./ContentSections/EducationSection";



const STORAGE_KEY = 'hr4u_editor_data';

export default function ClientContentPage({ initialData }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 3. Read *both* query params
  const currentSection = searchParams.get('section') || 'general';
  const isEditing = searchParams.get('edit') === 'true';

  // This 'content' state *always* holds the FULL JSON object
  const [content, setContent] = useState(initialData);

  // Load/save from localStorage (remains the same)
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setContent(JSON.parse(savedData));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      }
    } catch (err) {
      console.error("Error with localStorage:", err);
    }
  }, [initialData]); 

  const activeStep = isEditing ? 3 : 2; 

  // --- Header & Stepper Logic (Updated) ---
  const handleStepClick = (stepId) => {
    // 4. Keep the current section when changing steps
    const sectionQuery = `?section=${currentSection}`;

    if (stepId === 2) {
      router.push(`/content${sectionQuery}`); // Go to View mode
    } else if (stepId === 3) {
      router.push(`/content${sectionQuery}&edit=true`); // Go to Edit mode
    } else if (stepId === 4) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      router.push('/preview');
    }
  };
  
  let headerButtonText = isEditing ? 'Vorschau' : 'Bearbeiten';
  const handleHeaderButtonClick = () => {
    // 5. Also keep the section param here
    const sectionQuery = `?section=${currentSection}`;
    if (isEditing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      router.push('/preview');
    } else {
      router.push(`/content${sectionQuery}&edit=true`);
    }
  };

  // --- Content Change Handler ---
  // This function is passed to sub-editors
  const handleContentChange = (sectionKey, updatedData) => {
    setContent(prevContent => ({
      ...prevContent,
      [sectionKey]: updatedData
    }));
  };

  // --- 6. Conditional Rendering Logic ---
  const renderEditorSection = () => {
    // You can build "View" components later
    if (!isEditing) {
      return (
        <div>
          <h2>Ansehen-Modus: {currentSection}</h2>
          <pre>{JSON.stringify(content[currentSection] || content, null, 2)}</pre>
        </div>
      );
    }

    // This switch renders the correct *editing* component
    switch (currentSection) {
      // We need to create GeneralEditor
      case 'general':
         return <h2>Allgemein Editor (muss noch erstellt werden)</h2>
         /* return <GeneralEditor 
                  data={{ first_name: content.first_name, last_name: content.last_name, role: content.role ...etc }}
                  onChange={(updatedGeneralData) => {
                    setContent(prevContent => ({ ...prevContent, ...updatedGeneralData }));
                  }} 
               />;
         */
      
      // We will create EducationEditor now
      case 'education':
        return <EducationSection
                  data={content.education} 
                  onChange={(updatedData) => handleContentChange('education', updatedData)} 
               />;
      
      // ... add cases for languages, skills, etc.
      default:
        return <div>Abschnitt: {currentSection} (Editor muss noch erstellt werden)</div>;
    }
  };

  // --- 7. Final Render (with Sidebar) ---
  return (
    // Use h-screen and flex to create the sidebar layout
    <div className="flex flex-col h-screen">
      <Header 
        activeStep={activeStep}
        onStepClick={handleStepClick}
        onHeaderButtonClick={handleHeaderButtonClick}
        headerButtonText={headerButtonText}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* The Sidebar is now part of the layout */}
        <EditorSidebar />
        
        {/* The Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          {renderEditorSection()}
        </main>
      </div>
    </div>
  );
}