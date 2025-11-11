'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Define your sections based on the JSON keys
const sections = [
  { key: 'general', name: 'Allgemein' },
  { key: 'languages', name: 'Sprachen' },
  { key: 'education', name: 'Ausbildung' },
  { key: 'certifications', name: 'Zertifikate' },
  { key: 'projects', name: 'Projekte' },
  { key: 'skills', name: 'Skills' },
  { key: 'hobbies', name: 'Hobbies' },
];

export default function EditorSidebar() {
  const searchParams = useSearchParams();
  const currentSection = searchParams.get('section') || 'general'; // Default to 'general'
  const isEditing = searchParams.get('edit') === 'true';

  return (
    <nav className="w-64 p-4 border-r bg-white flex-shrink-0">
      <h3 className="text-lg font-semibold mb-4">Profil-Abschnitte</h3>
      <ul>
        {sections.map((section) => {
          const isActive = section.key === currentSection;
          return (
            <li key={section.key} className="mb-2">
              <Link
                href={`/content?section=${section.key}${isEditing ? '&edit=true' : ''}`}
                className={`
                  block p-2 rounded text-sm
                  ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-gray-100 text-gray-700'}
                `}
              >
                {section.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}