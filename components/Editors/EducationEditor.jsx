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
import Label from '../common/Label';
import EditorLayout from './EditorLayout';

const newEntryDefaults = {
  start: "",
  end: "",
  degree: "",
  institution: ""
};

export default function EducationEditor({ data, onChange }) {
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [newEntryIndex, setNewEntryIndex] = useState(null);
  const [tempEntry, setTempEntry] = useState(null);
  const selectAllCheckboxRef = useRef(null);
  const [errors, setErrors] = useState({});
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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setTempEntry({ ...data[index] });
    setErrors({});
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
    if (editIndex === null) return;

    const newErrors = {};

    if (!tempEntry.degree || tempEntry.degree.trim() === "") {
      newErrors.degree = "Der Abschluss muss ausgefüllt werden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedData = [...data];
    updatedData[editIndex] = tempEntry;
    onChange(updatedData);

    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      const isStillEmpty = Object.values(tempEntry).every(val => val === "");
      if (isStillEmpty) {
        handleDelete(editIndex);
        return;
      }
    }

    setEditIndex(null);
    setNewEntryIndex(null);
    setTempEntry(null);
    setErrors({});
  };

  const handleCancel = () => {
    if (editIndex === newEntryIndex && newEntryIndex !== null) {
      handleDelete(editIndex);
    }
    setEditIndex(null);
    setNewEntryIndex(null);
    setTempEntry(null);

    setErrors({});
  };

  const isSelectionActive = selectedIndices.length > 0;
  const isEditingItem = editIndex !== null;

  return (
    <EditorLayout
      title="Ausbildung"
      navLinks={
        <>
          <NavLink href="/content?section=profile&edit=true"><FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Profil</NavLink>
          <NavLink href="/content?section=certifications&edit=true">Zertifikate<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" /></NavLink>
        </>
      }
      itemCount={data.length}
      itemName="AUSBILDUNG"
      itemNamePlural="AUSBILDUNGEN"
      isSelectionActive={isSelectionActive}
      selectedCount={selectedIndices.length}
      onSelectAll={handleSelectAll}
      onDeselectAll={handleDeselectAll}
      onDeleteSelected={handleDeleteSelected}
      isEditingItem={isEditingItem}
      selectAllCheckboxRef={selectAllCheckboxRef}
      addNewButton={<button onClick={handleAddNew} className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"><FontAwesomeIcon icon={faPlus} className="h-3 w-3" />AUSBILDUNG HINZUFÜGEN</button>}
    >
      <div className="flex flex-col gap-4 mt-4" ref={listContainerRef}>
        {data.length > 0 ? (
          data.map((entry, index) => {
            const isThisRowEditing = editIndex === index;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 bg-surface-rise border border-border`}
              >

                {isThisRowEditing ? (
                  <div className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-interactive border-interactive focus:ring-interactive"
                    checked={selectedIndices.includes(index)}
                    onChange={() => handleItemSelect(index)}
                    disabled={isEditingItem}
                  />
                )}
                <div className="flex-1 flex gap-6">

                  <div className='flex-1'>
                    {isThisRowEditing ? (
                      <div className="flex flex-col gap-2">

                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label>Von</Label>
                            <input
                              ref={editInputRef}
                              type="text"
                              value={tempEntry?.start || ''}
                              onChange={(e) => handleTempEntryChange('start', e.target.value)}
                              className="w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
                              placeholder="z.B. Sep. 2025"
                            />
                          </div>
                          <span>-</span>
                          <div className="flex-1">
                            <Label>Bis</Label>
                            <input
                              type="text"
                              value={tempEntry?.end || ''}
                              onChange={(e) => handleTempEntryChange('end', e.target.value)}
                              className="w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
                              placeholder="z.B. Juni 2025"
                            />
                          </div>
                        </div>
                        <p className='text-xs'>Format: Mon. YYYY (z.B. Jän. 2025)</p>
                      </div>
                    ) : (
                      <>
                        <Label>Zeitraum</Label>
                        <p className="mt-1 w-max">{entry.start} - {entry.end}</p>
                      </>
                    )}
                  </div>


                  <div className='flex-1'>
                    <Label>Abschluss</Label>
                    {isThisRowEditing ? (
                      <>
                        <input
                          type="text"
                          value={tempEntry?.degree || ''}
                          onChange={e => handleTempEntryChange('degree', e.target.value)}
                          className={`mt-1 w-full p-1 bg-surface-rise border-b  focus:outline-none ${
                            errors.degree
                              ? 'border-interactive-critical'
                              : 'border-border focus:border-interactive-active'
                          }`}
                          placeholder="z.B. Master"
                        />
                        {errors.degree && <p className="text-xs text-interactive-critical mt-1">{errors.degree}</p>}
                      </>
                    ) : (
                      <p className="mt-1">{entry.degree}</p>
                    )}
                  </div>

                  <div className='flex-1'>
                    <Label>Institution</Label>
                    {isThisRowEditing ? (
                      <input
                        type="text"
                        value={tempEntry?.institution || ''}
                        onChange={(e) => handleTempEntryChange('institution', e.target.value)}
                        className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none"
                        placeholder="z.B. FH Technikum"
                      />
                    ) : (
                      <p className="mt-1">{entry.institution}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 w-16 justify-end">
                  {isThisRowEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="text-interactive hover:text-interactive-hover"
                        title="Speichern"
                      >
                        <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-interactive hover:text-interactive-hover"
                        title="Abbrechen"
                      >
                        <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(index)}
                        className="text-interactive hover:text-interactive-hover"
                        title="Bearbeiten"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-interactive-critical hover:text-interactive-critical-hover"
                        title="Löschen"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">Keine Ausbildungen vorhanden</h3>
            <p className="mt-2 text-sm text-secondary">Fügen Sie Ihre erste Ausbildung hinzu, um zu beginnen.</p>
            <button
              onClick={handleAddNew}
              className="mt-4 flex items-center gap-2 mx-auto py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              AUSBILDUNG HINZUFÜGEN
            </button>
          </div>
        )}
      </div>

    </EditorLayout>
  );
}