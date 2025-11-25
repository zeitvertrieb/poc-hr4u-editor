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

export default function IndustryExperienceView({ data }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">Branchenerfahrung</h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=core_qualifications">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Kernqualifikationen
          </NavLink>
          <NavLink href="/content?section=projects">
            Projekterfahrung<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {data && data.length > 0 ? (
          data.map((entry, index) => (
            <div key={index} className="bg-surface-rise p-4 border border-border">
              <div className="flex gap-6">
                <div className='w-full'>
                  <span className="text-xs font-bold uppercase">Name</span>
                  <p className="mt-1">{entry.name}</p>
                </div>
                <div className='w-full'>
                  <span className="text-xs font-bold uppercase">Jahre</span>
                  <p className="mt-1">{entry.years}</p>
                </div>
                <div className='w-full'>
                  <span className="text-xs font-bold uppercase">Monate</span>
                  <p className="mt-1">{entry.months}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">Keine Branchenerfahrung vorhanden</h3>
            <p className="mt-2 text-sm text-secondary">In dieser Kategorie wurden noch keine Einträge hinzugefügt.</p>
          </div>
        )}
      </div>
    </div>
  );
}