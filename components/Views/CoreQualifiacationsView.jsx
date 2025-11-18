'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm font-medium text-interactive hover:text-interactive-hover">
      {children}
    </Link>
  );
}

export default function CoreQualificationsView({ data }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">Kernqualifikationen</h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=professional_focus">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Fachliche Schwerpunkte
          </NavLink>
          <NavLink href="/content?section=industry_experience">
            Branchenerfahrung<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {data.map((entry, index) => (
          <div key={index} className="bg-surface-rise p-4 border border-border">
            <div className="flex gap-6">
              <div className='w-full'>
                <span className="text-xs font-bold uppercase">Name</span>
                <p className="mt-1">{entry.name}</p>
              </div>
              <div className='w-full'>
                <span className="text-xs font-bold uppercase">Punkte</span>
                <p className="mt-1">{entry.points}</p>
              </div>
              <div className='w-full'>
                <span className="text-xs font-bold uppercase">Jahre</span>
                <p className="mt-1">{entry.years}</p>
              </div>
              <div className='w-full'>
                <span className="text-xs font-bold uppercase">Level</span>
                <p className="mt-1">{entry.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}