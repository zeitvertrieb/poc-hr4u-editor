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
import NavLink from '../common/NavLink';
import EditorLayout from './EditorLayout';

const newEntryDefault = "";

export default function ProfessionalFocusEditor({ data, onChange }) {
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
    const newData = [...data, newEntryDefault];
    onChange(newData);
    setEditIndex(data.length);
    setNewEntryIndex(data.length);
  };

  const handleTempEntryChange = (value) => {
    setTempEntry(value);
  };

  const handleTextareaChange = (e) => {
    handleTempEntryChange(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setTempEntry(data[index]);
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
  };

  const handleSave = () => {
    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      if (!tempEntry || tempEntry.trim() === "" || tempEntry === newEntryDefault) {
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
  };



  const isSelectionActive = selectedIndices.length > 0;
  const isEditingItem = editIndex !== null;

  return (
    <EditorLayout
      title="Fachliche Schwerpunkte"
      navLinks={
        <>
          <NavLink href="/content?section=certifications&edit=true">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />
            Zertifikate
          </NavLink>
          <NavLink href="/content?section=core_qualifications&edit=true">
            Kernqualifikationen
            <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </>
      }
      itemCount={data.length}
      itemName="SCHWERPUNKT"
      itemNamePlural="SCHWERPUNKTE"
      isSelectionActive={isSelectionActive}
      selectedCount={selectedIndices.length}
      onSelectAll={handleSelectAll}
      onDeselectAll={handleDeselectAll}
      onDeleteSelected={handleDeleteSelected}
      isEditingItem={isEditingItem}
      selectAllCheckboxRef={selectAllCheckboxRef}
      addNewButton={<button onClick={handleAddNew} className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"><FontAwesomeIcon icon={faPlus} className="h-3 w-3" />SCHWERPUNKT HINZUFÜGEN</button>}
    >
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
                    <>
                      <label className='sr-only'>Schwerpunkt</label>
                      <textarea
                        ref={editInputRef}
                        value={tempEntry || ''}
                        onChange={handleTextareaChange}
                        className="w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none resize-none overflow-hidden"
                        rows="1"
                        placeholder="z.B. Durchführung von Benutzerforschung..."
                      />
                    </>
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
                      <button onClick={() => startEditing(index)} className="text-interactive hover:text-interactive-hover" title="Bearbeiten" > <FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" /> </button>
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

    </EditorLayout>
  );
}