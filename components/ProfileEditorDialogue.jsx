'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function ProfileEditorDialog({ user, isOpen, onClose, onSave }) {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = editedUser.languages.map((lang, i) => {
      if (i === index) {
        return { ...lang, [field]: value };
      }
      return lang;
    });
    setEditedUser(prev => ({ ...prev, languages: updatedLanguages }));
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
      <div className="relative bg-surface-rise p-8 md:p-12 w-full max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-interactive hover:text-interactive-hover">
          <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-primary font-zilla-slab mb-6 border-b border-border pb-4">
          Eckdaten Bearbeiten
        </h2>
        <div className="flex flex-col gap-x-8 gap-y-6">
          <div className='flex gap-4'>
            <div className='w-full'>
              <label htmlFor="first_name" className="block text-primary font-bold mb-2">Vorname</label>
              <input
                type="text"
                id="first_name"
                className="w-full p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
                value={editedUser.first_name || ''}
                onChange={(e) => handleChange('first_name', e.target.value)}
              />
            </div>

            <div className='w-full'>
              <label htmlFor="last_name" className="block text-primary font-bold mb-2">Nachname</label>
              <input
                type="text"
              id="last_name"
              className="w-full p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
              value={editedUser.last_name || ''}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
          </div>
        </div>
          

          <div className="col-span-full">
            <label htmlFor="role" className="block text-primary font-bold mb-2">Rolle</label>
            <input
              type="text"
              id="role"
              className="w-full p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
              value={editedUser.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
            />
          </div>
          <div className='w-max'>
            <label htmlFor="birthyear" className="block text-primary font-bold mb-2">Geburtsjahr</label>
            <input
              type="text"
              id="birthyear"
              className="w-max p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
              value={editedUser.birthyear || ''}
              onChange={(e) => handleChange('birthyear', e.target.value)}
            />
          </div>

          <div className='w-1/2'>
            <label htmlFor="nationality" className="block text-primary font-bold mb-2">Staatsangehörigkeit</label>
            <input
              type="text"
              id="nationality"
              className="w-full p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
              value={editedUser.nationality || ''}
              onChange={(e) => handleChange('nationality', e.target.value)}
            />
          </div>
          
          <div className="col-span-full">
            <label className="block text-primary font-bold mb-2">Sprachen</label>
            {editedUser.languages && editedUser.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        value={lang.language}
                        onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                        className="flex-1 p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
                        placeholder="Sprache"
                    />
                    <input
                        type="text"
                        value={lang.proficiency}
                        onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                        className="flex-1 p-2 border border-border focus:border-interactive focus:outline-none bg-surface"
                        placeholder="Niveau (z.B. Fließend)"
                    />
                </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
          >
            ABBRECHEN
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 py-2 px-4 bg-interactive border-2 border-interactive text-text-on-interactive font-bold hover:border-interactive-hover hover:bg-interactive-hover"
          >
            SPEICHERN
          </button>
        </div>
      </div>
    </div>
  );
}