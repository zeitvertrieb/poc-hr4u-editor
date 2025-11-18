'use client'

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

export default function EducationView({ data }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">Ausbildung</h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=hobbies"> <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Hobbies</NavLink>
          <NavLink href="/content?section=certifications">  Zertifikate<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" /> </NavLink>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {data.map((entry, index) => (
          <div key={index} className="bg-surface-rise p-4 border border-border">
            <div className="flex gap-6">
              <div className=''>
                <span className="text-xs font-bold uppercase">Zeitraum</span>
                <p className="mt-1 w-max">{entry.start} - {entry.end}</p>
              </div>

              <div className='w-full'>
                <span className="text-xs font-bold  uppercase">Abschluss</span>
                <p className="mt-1">{entry.degree}</p>
              </div>
              
              <div className='w-full'>
                <span className="text-xs font-bold uppercase">Institution</span>
                <p className="mt-1">{entry.institution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}