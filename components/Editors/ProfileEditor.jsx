'use client';

import React from 'react';
import NavLink from '../common/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Label from '../common/Label';

const languagesToString = (langs) => {
  if (!Array.isArray(langs)) return langs || '';
  return langs.map((l) => `${l.language} (${l.proficiency})`).join('\n');
};

const stringToLanguages = (str) => {
  return str
    .split('\n')
    .map((line) => {
      const match = line.match(/^(.*)\s\((.*)\)$/);
      return match
        ? { language: match[1].trim(), proficiency: match[2].trim() }
        : { language: line.trim(), proficiency: '' };
    })
    .filter((l) => l.language);
};

export default function ProfileEditor({ data, onChange }) {
  if (!data) return null;

  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleTextareaChange = (e) => {
    const languagesArray = stringToLanguages(e.target.value);
    handleFieldChange('languages', languagesArray);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">
          Profil bearbeiten
        </h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=hobbies&edit=true">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />
            Hobbies
          </NavLink>
          <NavLink href="/content?section=education&edit=true">
            Ausbildungen
            <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </div>
      </div>

      <div className="mt-8 p-6 bg-surface-rise border border-border space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Vorname</Label>
            <input
              type="text"
              value={data.first_name || ''}
              onChange={(e) => handleFieldChange('first_name', e.target.value)}
              className="mt-1 w-full p-2 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
              placeholder="Ihr Vorname"
            />
          </div>
          <div>
            <Label>Nachname</Label>
            <input
              type="text"
              value={data.last_name || ''}
              onChange={(e) => handleFieldChange('last_name', e.target.value)}
              className="mt-1 w-full p-2 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
              placeholder="Ihr Nachname"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Rolle</Label>
            <input
              type="text"
              value={data.role || ''}
              onChange={(e) => handleFieldChange('role', e.target.value)}
              className="mt-1 w-full p-2 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
              placeholder="Ihre Rolle"
            />
          </div>
          <div className="space-y-6">
            <div>
              <Label>Geburtsjahr</Label>
              <input
                type="text"
                value={data.birthyear || ''}
                onChange={(e) => handleFieldChange('birthyear', e.target.value)}
                className="mt-1 w-full p-2 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
                placeholder="Ihr Geburtsjahr"
              />
            </div>
            <div>
              <Label>Staatsangehörigkeit</Label>
              <input
                type="text"
                value={data.nationality || ''}
                onChange={(e) =>
                  handleFieldChange('nationality', e.target.value)
                }
                className="mt-1 w-full p-2 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
                placeholder="Ihre Staatsangehörigkeit"
              />
            </div>
          </div>
        </div>
        <div>
          <Label>Sprachen</Label>
          <textarea
            value={languagesToString(data.languages)}
            onChange={handleTextareaChange}
            className="mt-1 w-full p-2 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none resize-none overflow-hidden"
            rows="2"
            placeholder="Sprachen, eine pro Zeile..."
          />
        </div>
      </div>
    </div>
  );
}
