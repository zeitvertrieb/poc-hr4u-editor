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

function Label({ children }) {
    return (
        <span className="text-xs font-bold uppercase text-primary">
            {children}
        </span>
    );
}

const newEntryDefaults = {
    start: "",
    end: "",
    firm: "",
    role: "",
    name: "",
    description: "",
    team_size: "",
    tasks: [],
    technologies: []
};

const arrayToText = (arr) => (arr || []).join('\n');
const textToArray = (text) => text.split('\n');

export default function ProjectsEditor({ data, onChange }) {
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

    const handleTextareaChange = (e, field) => {
        handleTempEntryChange(field, e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleArrayTextareaChange = (e, field) => {
        const text = e.target.value;
        const arrayValue = textToArray(text);
        handleTempEntryChange(field, arrayValue);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
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
    };
    
    const handleSave = () => {
        if (editIndex === newEntryIndex && newEntryIndex !== null) {
            const isStillEmpty = Object.values(tempEntry).every(val => val === "" || (Array.isArray(val) && val.length === 0));
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
        <div className="w-full max-w-6xl mx-auto px-2">
            <div className="flex flex-col mb-4 gap-4">
                <h2 className="text-3xl font-bold text-primary font-zilla-slab">Projekterfahrung</h2>
                <div className="flex items-center gap-4">
                    <NavLink href="/content?section=industry_experience">
                        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Branchenerfahrung
                    </NavLink>
                    <NavLink href="/content?section=skills">
                        Skills<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
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
                        <span className="text-sm font-bold text-primary">{selectedIndices.length} AUSGEWÄHLT</span>
                        <button onClick={handleDeselectAll} className="text-sm font-bold text-interactive hover:underline">AUSWAHL AUFHEBEN</button>
                        <button onClick={handleDeleteSelected} className="text-sm font-bold text-interactive-critical hover:underline">AUSWAHL LÖSCHEN</button>
                    </>
                ) : (
                    <span className="text-sm text-primary font-bold uppercase">{data.length} {data.length === 1 ? 'PROJEKT' : 'PROJEKTE'}</span>
                )}
            </div>

            <div className="mt-4 space-y-4" ref={listContainerRef}>
                {data.length > 0 ? (
                    data.map((entry, index) => {
                        const isThisRowEditing = editIndex === index;
                        return (
                            <div
                                key={index}
                                className={`flex items-start gap-4 p-4 bg-surface-rise border ${isThisRowEditing ? 'border-primary shadow-md' : 'border-border'
                                    }`}
                            >
                                <div className="pt-1">
                                    {isThisRowEditing ? (
                                        <div className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <input type="checkbox" className="h-5 w-5 text-interactive border-interactive focus:ring-interactive flex-shrink-0" checked={selectedIndices.includes(index)} onChange={() => handleItemSelect(index)} disabled={isEditingItem} />
                                    )}
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6">

                                    <div className="md:col-span-1">
                                        {isThisRowEditing ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <Label>Von</Label>
                                                        <input ref={editInputRef} type="text" value={tempEntry?.start || ''} onChange={(e) => handleTempEntryChange('start', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. Jan. 2023" />
                                                    </div>
                                                    <div>
                                                        <Label>Bis</Label>
                                                        <input type="text" value={tempEntry?.end || ''} onChange={(e) => handleTempEntryChange('end', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. Dez. 2025" />
                                                    </div>
                                                </div>
                                                <p className='text-xs'>Format: Mon. YYYY (z.B. Jan. 2025)</p>
                                            </div>
                                        ) : (
                                            <>
                                                <Label>Zeitraum</Label>
                                                <p className="mt-1 w-max">{entry.start} - {entry.end}</p>
                                            </>
                                        )}
                                    </div>

                                    <div className="md:col-span-1">
                                        <Label>Firma</Label>
                                        {isThisRowEditing ? (
                                            <input type="text" value={tempEntry?.firm || ''} onChange={(e) => handleTempEntryChange('firm', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. Tech Innovations" />
                                        ) : (
                                            <p className="mt-1">{entry.firm}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-3 space-y-4">
                                        <div>
                                            <p className='font-semibold'>Allgemeine Projektbeschreibung</p>
                                            {isThisRowEditing ? (
                                                <div className="flex flex-col gap-2 mt-1">
                                                    <div>
                                                        <Label>Projektname</Label>
                                                        <input type="text" value={tempEntry?.name || ''} onChange={(e) => handleTempEntryChange('name', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="User-Centric Design" />
                                                    </div>
                                                    <div>
                                                        <Label>Rolle</Label>
                                                        <input type="text" value={tempEntry?.role || ''} onChange={(e) => handleTempEntryChange('role', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. UX Designer" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="mt-1 text-lg font-semibold text-primary">Project Name: {entry.name}</p>
                                                    <p className="mt-1">{entry.role}</p>
                                                </>
                                            )}
                                        </div>

                                        <div>
                                            {isThisRowEditing ? (
                                                <div>
                                                    <Label>Beschreibung</Label>
                                                    <textarea
                                                        value={tempEntry?.description || ''}
                                                        onChange={(e) => handleTextareaChange(e, 'description')}
                                                        className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none resize-none overflow-hidden"
                                                        rows="1" placeholder="Beschreibung..." />
                                                </div>
                                            ) : (
                                                <p>{entry.description}</p>
                                            )}
                                        </div>
                                        <div>
                                            {isThisRowEditing ? (
                                                <div>
                                                    <Label>Teamgröße</Label>
                                                    <input type="text" value={tempEntry?.team_size || ''} onChange={(e) => handleTempEntryChange('team_size', e.target.value)} className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" placeholder="z.B. 8" />
                                                </div>
                                            ) : (
                                                <p>Teamgröße: {entry.team_size}</p>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-semibold">Meine Aufgaben umfassen dabei:</p>
                                            {isThisRowEditing ? (
                                                <textarea
                                                value={arrayToText(tempEntry?.tasks)}
                                                onChange={(e) => handleArrayTextareaChange(e, 'tasks')}
                                                    className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none resize-none overflow-hidden"
                                                    rows="1" placeholder="Eine Aufgabe pro Zeile..." />
                                            ) : (
                                                <div className="mt-1 space-y-1">
                                                    {entry.tasks.map((task, i) => <p key={i}>{task}</p>)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-semibold">Verwendete Technologien</p>
                                            {isThisRowEditing ? (
                                                <textarea
                                                value={arrayToText(tempEntry?.technologies)}
                                                onChange={(e) => handleArrayTextareaChange(e, 'technologies')}
                                                    className="mt-1 w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none resize-none overflow-hidden"
                                                    rows="1" placeholder="Eine Technologie pro Zeile..." />
                                            ) : (
                                                <div className="mt-1 space-y-1">
                                                    {entry.technologies.map((tech, i) => <p key={i}>{tech}</p>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 w-16 justify-end pt-1">
                                    {isThisRowEditing ? (
                                        <>
                                            <button onClick={handleSave} className="text-interactive hover:text-interactive-hover" title="Speichern"><FontAwesomeIcon icon={faCheck} className="h-4 w-4" /></button>
                                            <button onClick={handleCancel} className="text-interactive hover:text-interactive-hover" title="Abbrechen"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                                        </>
                                    ) : (
                                        <>
                                        <button onClick={() => startEditing(index)} className="text-interactive hover:text-interactive-hover" title="Bearbeiten"><FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(index)} className="text-interactive-critical hover:text-interactive-critical-hover" title="Löschen"><FontAwesomeIcon icon={faTrash} className="h-4 w-4" /></button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 px-6 bg-surface-rise border border-border">
                        <h3 className="text-lg font-semibold text-primary">Keine Projekte vorhanden</h3>
                        <p className="mt-2 text-sm text-secondary">Fügen Sie Ihr erstes Projekt hinzu, um zu beginnen.</p>
                        <button
                            onClick={handleAddNew}
                            className="mt-4 flex items-center gap-2 mx-auto py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
                        >
                            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                            PROJEKT HINZUFÜGEN
                        </button>
                    </div>
                )}
            </div>

            {data.length > 0 && (
                <div className="flex justify-end mt-6">
                    <button onClick={handleAddNew} className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover">
                        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                        PROJEKT HINZUFÜGEN
                    </button>
                </div>
            )}
        </div>
    );
}