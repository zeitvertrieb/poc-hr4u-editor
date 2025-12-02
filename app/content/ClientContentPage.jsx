'use client';

import Header from "@/components/Navigation/Header";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileSidebar from '@/components/Navigation/ProfileSidebar';
import SectionSidebar from '@/components/Navigation/SectionSidebar';
import EducationView from '@/components/Views/EducationView';
import EducationEditor from '@/components/Editors/EducationEditor';
import { STORAGE_KEY } from "@/lib/constants";
import CertificateEditor from "@/components/Editors/CertificateEditor";
import CertificateView from "@/components/Views/CertificateView";
import ProfessionalFocusEditor from "@/components/Editors/ProfessionalFocusEditor";
import ProfessionalFocusView from "@/components/Views/ProfessionalFocusView";
import CoreQualificationsEditor from "@/components/Editors/CoreQualifiacationsEditor";
import CoreQualificationsView from "@/components/Views/CoreQualifiacationsView";
import IndustryExperienceEditor from "@/components/Editors/IndustryExperienceEditor";
import IndustryExperienceView from "@/components/Views/IndustryExperienceView";
import HobbiesEditor from "@/components/Editors/HobbiesEditor";
import HobbiesView from "@/components/Views/HobbiesView";
import ProjectsEditor from "@/components/Editors/ProjectsEditor";
import ProjectsView from "@/components/Views/ProjectsView";
import SkillsEditor from "@/components/Editors/SkillsEditor";
import SkillsView from "@/components/Views/SkillsView";
import ProfileEditor from "@/components/Editors/ProfileEditor";
import ProfileView from "@/components/Views/ProfileView";

export default function ClientContentPage({ currentSection, isEditing }) {
  const router = useRouter();

  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
          setContent(JSON.parse(savedData));
        } else {
          console.warn("No data in localStorage. Loading test data from /test-json.json.");
          const response = await fetch('/test-json.json');
          const testData = await response.json();
          setContent(testData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        localStorage.removeItem(STORAGE_KEY);
      }
      setIsLoading(false);
    };

    if (hasMounted) {
      loadData();
    }
  }, [hasMounted]);
  useEffect(() => {
    if (hasMounted && content && !isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  }, [content, isLoading, hasMounted]);

  const handleStepClick = (stepId) => {
    const sectionQuery = `?section=${currentSection}`;
    if (stepId === 2) {
      router.push(`/content${sectionQuery}`);
    } else if (stepId === 3) {
      router.push(`/content${sectionQuery}&edit=true`);
    } else if (stepId === 4) {
      router.push('/preview');
    }
  };

  let headerButtonText = isEditing ? 'Vorschau' : 'Bearbeiten';
  const handleHeaderButtonClick = () => {
    const sectionQuery = `?section=${currentSection}`;
    if (isEditing) {
      router.push('/preview');
    } else {
      router.push(`/content${sectionQuery}&edit=true`);
    }
  };


  const handleContentChange = (sectionKey, updatedData) => {
    setContent(prevContent => ({
      ...prevContent,
      [sectionKey]: updatedData
    }));
  };

  const handleProfileSave = (updatedUser) => {
    setContent(prevContent => ({
      ...prevContent,
      ...updatedUser
    }));
  };

  const renderContent = () => {
    switch (currentSection) {
      case  'profile':
        return isEditing ? (
          <ProfileEditor data={content} onChange={handleProfileSave} />
        ) : (
          <ProfileView data={content} />
        );

      case 'education':
        return isEditing ? (
          <EducationEditor data={content.education}
            onChange={(updatedData) => handleContentChange('education', updatedData)}
          />
        ) : (
          <EducationView data={content.education} />
        );

      case 'certifications':
        return isEditing ? (
          <CertificateEditor data={content.certifications}
            onChange={(updatedData) => handleContentChange('certifications', updatedData)}
          />
        ) : (
          <CertificateView data={content.certifications} />
        );

      case 'professional_focus':
        return isEditing ? (
          <ProfessionalFocusEditor data={content.professional_focus}
            onChange={(updatedData) => handleContentChange('professional_focus', updatedData)}
          />
        ) : (
          <ProfessionalFocusView data={content.professional_focus} />
        );

      case 'core_qualifications':
        return isEditing ? (
          <CoreQualificationsEditor data={content.core_qualifications} onChange={(data) => handleContentChange('core_qualifications', data)} />
        ) : (
          <CoreQualificationsView data={content.core_qualifications} />
        );

      case 'industry_experience':
        return isEditing ? (
          <IndustryExperienceEditor data={content.industry_experience} onChange={(data) => handleContentChange('industry_experience', data)} />
        ) : (
          <IndustryExperienceView data={content.industry_experience} />
        );

      case 'projects':
        return isEditing ? (
          <ProjectsEditor data={content.projects} onChange={(data) => handleContentChange('projects', data)} />
        ) : (
          <ProjectsView data={content.projects} />
        );

      case 'skills':
        return isEditing ? (
          <SkillsEditor data={content.skills} onChange={(data) => handleContentChange('skills', data)} />
        ) : (
          <SkillsView data={content.skills} />
        );

      case 'hobbies':
        return isEditing ? (
          <HobbiesEditor data={content.hobbies} onChange={(data) => handleContentChange('hobbies', data)} />
        ) : (
          <HobbiesView data={content.hobbies} />
        );

      default:
        return (
          <div>
            <h2 className="text-2xl font-bold">{currentSection}</h2>
            <p>View/Editor for this section not yet implemented.</p>
          </div>
        );
    }
  };

  if (!hasMounted || isLoading || !content) {
    return (
      <div className="flex flex-col h-screen bg-surface-rise"> 
        <Header activeStep={2} />
        <div className="flex-1 flex items-center justify-center">
          <p>Lade Daten...</p>
        </div>
      </div>
    );
  }

  const activeStep = isEditing ? 3 : 2;

  return (
    <div className="flex flex-col h-screen">
      <Header 
        activeStep={activeStep}
        onStepClick={handleStepClick}
        onHeaderButtonClick={handleHeaderButtonClick}
        headerButtonText={headerButtonText}
      />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 flex-shrink-0 bg-surface-rise border-r border-border overflow-y-auto">
          <ProfileSidebar 
            user={content}
          />
          <SectionSidebar />
        </aside>
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}