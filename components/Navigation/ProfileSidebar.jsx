'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default function ProfileSidebar({ user, onEditClick }) {
  const { 
    first_name = '', 
    last_name = '', 
    role = '', 
    birthyear = '', 
    nationality = '', 
    languages = [] 
  } = user || {};

  return (
    <div className="p-6 border-b border-border text-primary">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">
          {first_name} <br /> {last_name}
        </h2>
        <button onClick={onEditClick} className="text-interactive hover:text-primary">
          <FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" />
        </button>
      </div>

      <p className="font-semibold mb-6">{role.toUpperCase()}</p>

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-bold block">Geburtsjahr</p>
          <p>{birthyear}</p>
        </div>
        <div>
          <p className="font-bold ">Staatsangehörigkeit</p>
          <p>{nationality}</p>
        </div>
        <div>
          <span className="font-bold block">Sprachen</span>
          {languages.map((lang) => (
            <span key={lang.language} className="block">
              {lang.language} ({lang.proficiency})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}