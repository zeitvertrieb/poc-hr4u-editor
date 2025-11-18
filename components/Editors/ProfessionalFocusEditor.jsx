'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faPencilAlt,
  faTrash,
  faPlus,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm font-medium text-interactive hover:text-interactive-hover">
      {children}
    </Link>
  );
}

const newEntryDefault = "";

export default function ProfessionalFocusEditor({ data, onChange }) {
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [newEntryIndex, setNewEntryIndex] = useState(null);
  const selectAllCheckboxRef = useRef(null);
  const listContainerRef = useRef(null);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      if (selectedIndices.length > 0 && selectedIndices.length < data.length) {
        selectAllCheckboxRef.current.indeterminate = true;
      } else {
        selectAllCheckboxRef.current.indeterminate = false;
      }
    }
  }, [selectedIndices, data.length]);

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
    const newData = [newEntryDefault, ...data];
    onChange(newData);
    setEditIndex(0);
    setNewEntryIndex(0);
    // Shift all existing selections down by one
    setSelectedIndices(prev => prev.map(i => i + 1));
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  };

  const handleEntryChange = (index, value) => {
    const updatedEntries = data.map((item, i) => (i === index ? value : item));
    onChange(updatedEntries);
  };

  const handleTextareaChange = (e, index) => {
    handleEntryChange(index, e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
  };

  const handleSave = () => {
    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      const entry = data[editIndex];
      if (!entry || entry.trim() === "" || entry === newEntryDefault) {
        handleDelete(editIndex);
        return;
      }
    }
    setEditIndex(null);
    setNewEntryIndex(null);
  };

  const handleCancel = () => {
    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      handleDelete(editIndex);
    }
    setEditIndex(null);
    setNewEntryIndex(null);
  };


  const isSelectionActive = selectedIndices.length > 0;
  const isEditingItem = editIndex !== null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">Fachliche Schwerpunkte</h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=certifications">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Zertifikate
          </NavLink>
          <NavLink href="/content?section=core_qualifications">
            Kernqualifikationen<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8 py-2 px-4 border-b border-border">
        <input
          type="checkbox"
          className="h-5 w-5 text-interactive border-interactive focus:ring-interactive"
          ref={selectAllCheckboxRef}
          checked={selectedIndices.length === data.length && data.length > 0}
          onChange={handleSelectAll}
          disabled={isEditingItem}
        />
        {isSelectionActive ? (
          <>
            <span className="text-sm font-bold text-primary">
              {selectedIndices.length} AUSGEWÄHLT
            </span>
            <button
              onClick={handleDeselectAll}
              className="text-sm font-bold text-interactive hover:underline"
            >
              AUSWAHL AUFHEBEN
            </button>
            <button
              onClick={handleDeleteSelected}
              className="text-sm font-bold text-interactive-critical hover:underline"
            >
              AUSWAHL LÖSCHEN
            </button>
          </>
        ) : (
          <span className="text-sm text-primary font-bold uppercase">
            {data.length} {data.length === 1 ? 'SCHWERPUNKT' : 'SCHWERPUNKTE'}
          </span>
        )}
      </div>

      <div className="space-y-4 mt-4" ref={listContainerRef}>
        {data.length > 0 ? (
          data.map((focus, index) => {
            const isThisRowEditing = editIndex === index;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 bg-surface-rise border ${isThisRowEditing ? 'border-primary shadow-md' : 'border-border'
                  }`}
              >

                {isThisRowEditing ? (
                  <div className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-interactive border-interactive focus:ring-interactive flex-shrink-0"
                    checked={selectedIndices.includes(index)}
                    onChange={() => handleItemSelect(index)}
                  />
                )}

                <div className="flex-1">
                  {isThisRowEditing ? (
                    <textarea
                      value={focus}
                      onChange={(e) => handleTextareaChange(e, index)}
                      className="w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none resize-none overflow-hidden"
                      rows="1"
                      placeholder="z.B. Durchführung von Benutzerforschung..."
                    />
                  ) : (
                    <p className="mt-1">{focus}</p>
                  )}
                </div>

                <div className="flex gap-4 w-16 justify-end">
                  {isThisRowEditing ? (
                    <>
                      <button onClick={handleSave} className="text-interactive hover:text-interactive-hover" title="Speichern" > <FontAwesomeIcon icon={faCheck} className="h-4 w-4" /> </button>
                      <button onClick={handleCancel} className="text-interactive hover:text-interactive-hover" title="Abbrechen" > <FontAwesomeIcon icon={faTimes} className="h-4 w-4" /> </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditIndex(index)} className="text-interactive hover:text-interactive-hover" title="Bearbeiten" > <FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" /> </button>
                      <button onClick={() => handleDelete(index)} className="text-interactive-critical hover:text-interactive-critical-hover" title="Löschen" > <FontAwesomeIcon icon={faTrash} className="h-4 w-4" /> </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">Keine Schwerpunkte vorhanden</h3>
            <p className="mt-2 text-sm text-secondary">Fügen Sie Ihren ersten Schwerpunkt hinzu, um zu beginnen.</p>
            <button
              onClick={handleAddNew}
              className="mt-4 flex items-center gap-2 mx-auto py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              SCHWERPUNKT HINZUFÜGEN
            </button>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
          >
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            SCHWERPUNKT HINZUFÜGEN
          </button>
        </div>
      )}
    </div>
  );
}