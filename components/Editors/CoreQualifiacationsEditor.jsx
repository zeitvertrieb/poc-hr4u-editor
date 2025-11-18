'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPencilAlt, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm font-medium text-interactive hover:text-interactive-hover">
      {children}
    </Link>
  );
}

const newEntryDefaults = {
  name: "",
  points: "",
  years: "",
  level: ""
};

export default function CoreQualificationsEditor({ data, onChange }) {
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [newEntryIndex, setNewEntryIndex] = useState(null);
  const [tempEntry, setTempEntry] = useState(null);
  const selectAllCheckboxRef = useRef(null);
  const listContainerRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      if (selectedIndices.length > 0 && selectedIndices.length < data.length) {
        selectAllCheckboxRef.current.indeterminate = true;
      } else {
        selectAllCheckboxRef.current.indeterminate = false;
      }
    }
  }, [selectedIndices, data.length]);

  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  const handleSelectAll = () => {
    if (selectedIndices.length > 0) {
      setSelectedIndices([]);
    } else {
      setSelectedIndices(data.map((_, index) => index));
    }
  };

  const handleItemSelect = (index) => {
    setSelectedIndices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleDeselectAll = () => {
    setSelectedIndices([]);
  };

  const handleDeleteSelected = () => {
    const newData = data.filter((_, index) => !selectedIndices.includes(index));
    onChange(newData);
    setSelectedIndices([]);
    setEditIndex(null);
    setNewEntryIndex(null);
  };

  const handleAddNew = () => {
    const newData = [...data, newEntryDefaults];
    onChange(newData);
    setEditIndex(data.length);
    setNewEntryIndex(data.length);
  };

  const handleTempEntryChange = (field, value) => {
    setTempEntry(prev => ({ ...prev, [field]: value }));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setTempEntry({ ...data[index] });
  }


  const handleDelete = (indexToDelete) => {
    const newArray = data.filter((_, index) => index !== indexToDelete);
    onChange(newArray);

    const newSelectedIndices = selectedIndices
      .filter(i => i !== indexToDelete)
      .map(i => (i > indexToDelete ? i - 1 : i));
    setSelectedIndices(newSelectedIndices);

    if (indexToDelete === editIndex) {
      setEditIndex(null);
      setNewEntryIndex(null);
    }
  }

  const handleSave = () => {
    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      const isStillEmpty = Object.keys(newEntryDefaults).every(key => tempEntry[key] === newEntryDefaults[key]);
      if (isStillEmpty) {
        handleDelete(editIndex);
        return;
      }
    }
    const updatedData = [...data];
    updatedData[editIndex] = tempEntry;
    onChange(updatedData);

    setEditIndex(null);
    setNewEntryIndex(null);
    setTempEntry(null);
  };
  const handleCancel = () => {
    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      handleDelete(editIndex);
    }
    setEditIndex(null);
    setNewEntryIndex(null);
    setTempEntry(null);
  };

  const isSelectionActive = selectedIndices.length > 0;
  const isEditingItem = editIndex !== null;

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

      <div className="flex items-center gap-6 mt-8 py-2 px-4 border-b border-border">
        <input type="checkbox" className="h-5 w-5 text-interactive border-interactive focus:ring-interactive" ref={selectAllCheckboxRef} checked={selectedIndices.length === data.length && data.length > 0} onChange={handleSelectAll} disabled={isEditingItem} />
        {isSelectionActive ? (
          <>
            <span className="text-sm font-bold text-primary">{selectedIndices.length} AUSGEWÄHLT</span>
            <button onClick={handleDeselectAll} className="text-sm font-bold text-interactive hover:underline">AUSWAHL AUFHEBEN</button>
            <button onClick={handleDeleteSelected} className="text-sm font-bold text-interactive-critical hover:underline">AUSWAHL LÖSCHEN</button>
          </>
        ) : (
          <span className="text-sm text-primary font-bold uppercase">{data.length} {data.length === 1 ? 'QUALIFIKATION' : 'QUALIFIKATIONEN'}</span>
        )}
      </div>

      <div className="space-y-4 mt-4" ref={listContainerRef}>
        {data.length > 0 ? (
          data.map((entry, index) => {
            const isThisRowEditing = editIndex === index;
            return (
              <div key={index} className={`flex items-center gap-4 p-4 bg-surface-rise border ${isThisRowEditing ? 'border-primary shadow-md' : 'border-border'} `}>
                {isThisRowEditing ? <div className="w-5 h-5 flex-shrink-0" /> : <input type="checkbox" className="h-5 w-5 text-interactive border-interactive focus:ring-interactive" checked={selectedIndices.includes(index)} onChange={() => handleItemSelect(index)} disabled={isEditingItem} />}
                <div className="flex-1 flex gap-6">
                  <div className='flex-1'>
                    <span className="text-xs font-bold uppercase">Name</span>
                    {isThisRowEditing ? <input ref={editInputRef} type="text" value={tempEntry?.name || ''} onChange={(e) => handleTempEntryChange('name', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. User Experience" /> : <p className="mt-1">{entry.name}</p>}
                  </div>
                  <div className='flex-1 text-right'>
                    <span className="text-xs font-bold uppercase">Punkte</span>
                    {isThisRowEditing ? <div className='flex flex-col gap-2'><input type="text" value={tempEntry?.points || ''} onChange={(e) => handleTempEntryChange('points', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none text-right" placeholder="z.B. 1.100" />  <p className='text-xs'>(1 Jahr = 220 PT)</p> </div> : <p className="mt-1">{entry.points}</p>}
                  </div>
                  <div className='flex-1 text-right'>
                    <span className="text-xs font-bold uppercase">Jahre</span>
                    {isThisRowEditing ? <input type="text" value={tempEntry?.years || ''} onChange={(e) => handleTempEntryChange('years', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none text-right" placeholder="z.B. 5" /> : <p className="mt-1">{entry.years}</p>}
                  </div>
                  <div className='flex-1'>
                    <span className="text-xs font-bold uppercase">Level</span>
                    {isThisRowEditing ? <input type="text" value={tempEntry?.level || ''} onChange={(e) => handleTempEntryChange('level', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. Ausgezeichnet" /> : <p className="mt-1">{entry.level}</p>}
                  </div>
                </div>
                <div className="flex gap-4 w-16 justify-end">
                  {isThisRowEditing ? (
                    <>
                      <button onClick={handleSave} className="text-interactive hover:text-interactive-hover" title="Speichern"><FontAwesomeIcon icon={faCheck} className="h-4 w-4" /></button>
                      <button onClick={handleCancel} className="text-interactive hover:text-interactive-hover" title="Abbrechen"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditIndex(index)} className="text-interactive hover:text-interactive-hover" title="Bearbeiten"><FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" /></button>
                      <button onClick={() => startEditing(index)} className="text-interactive-critical hover:text-interactive-critical-hover" title="Löschen" ><FontAwesomeIcon icon={faTrash} className="h-4 w-4" /></button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">Keine Kernqualifikationen vorhanden</h3>
            <p className="mt-2 text-sm text-secondary">Fügen Sie Ihre erste Qualifikation hinzu, um zu beginnen.</p>
            <button
              onClick={handleAddNew}
              className="mt-4 flex items-center gap-2 mx-auto py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              QUALIFIKATION HINZUFÜGEN
            </button>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex justify-end mt-6">
          <button onClick={handleAddNew} className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover">
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            QUALIFIKATION HINZUFÜGEN
          </button>
        </div>
      )}
    </div>
  );
}