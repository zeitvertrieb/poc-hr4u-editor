'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

const sections = [
  { key: 'profile', name: 'PROFIL' },
  { key: 'education', name: 'AUSBILDUNG' },
  { key: 'certifications', name: 'ZERTIFIKATE' },
  { key: 'professional_focus', name: 'FACHLICHE SCHWERPUNKTE' },
  { key: 'core_qualifications', name: 'KERNQUALIFIKATIONEN' },
  { key: 'industry_experience', name: 'BRANCHENERFAHRUNG' },
  { key: 'projects', name: 'PROJEKTERFAHRUNG' },
  { key: 'skills', name: 'SKILLS' },
  { key: 'hobbies', name: 'HOBBIES' },
];

export default function SectionSidebar() {
  const searchParams = useSearchParams();
  const currentSection = searchParams.get('section') || 'profile';
  const isEditing = searchParams.get('edit') === 'true';

  return (
    <nav className="py-6 pr-4">
      <ul>
        {sections.map((section) => {
          const isActive = section.key === currentSection;
          return (
            <li key={section.key}>
              <Link
                href={`/content?section=${section.key}${isEditing ? '&edit=true' : ''}`}
                className={clsx(
                  'block py-2.5 px-4 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-state-active text-interactive border-l-2 border-border-active"'
                    : 'text-primary hover:bg-state-hover'
                )}
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
