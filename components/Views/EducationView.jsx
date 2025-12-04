'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import NavLink from '../common/NavLink';

export default function EducationView({ data }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">
          Ausbildung
        </h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=profile">
            {' '}
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />
            Profil
          </NavLink>
          <NavLink href="/content?section=certifications">
            {' '}
            Zertifikate
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-3 w-3 ml-2"
            />{' '}
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {data && data.length > 0 ? (
          data.map((entry, index) => (
            <div
              key={index}
              className="bg-surface-rise p-4 border border-border"
            >
              <div className="flex gap-6">
                <div className="">
                  <span className="text-xs font-bold uppercase">Zeitraum</span>
                  <p className="mt-1 w-max">
                    {entry.start} - {entry.end}
                  </p>
                </div>

                <div className="w-full">
                  <span className="text-xs font-bold  uppercase">
                    Abschluss
                  </span>
                  <p className="mt-1">{entry.degree}</p>
                </div>

                <div className="w-full">
                  <span className="text-xs font-bold uppercase">
                    Institution
                  </span>
                  <p className="mt-1">{entry.institution}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">
              Keine Ausbildung vorhanden
            </h3>
            <p className="mt-2 text-sm text-secondary">
              In dieser Kategorie wurden noch keine Einträge hinzugefügt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
