'use client';

import React from 'react';

export default function EditorLayout({
  title,
  navLinks,
  itemCount,
  itemName,
  itemNamePlural,
  isSelectionActive,
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onDeleteSelected,
  isEditingItem,
  selectAllCheckboxRef,
  children,
  addNewButton,
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">{title}</h2>
        <div className="flex items-center gap-4">
          {navLinks}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8 py-2 px-4 border-b border-border">
        <input
          type="checkbox"
          className="h-5 w-5 text-interactive border-interactive focus:ring-interactive"
          ref={selectAllCheckboxRef}
          checked={itemCount > 0 && selectedCount === itemCount}
          onChange={onSelectAll}
          disabled={isEditingItem}
        />
        {isSelectionActive ? (
          <>
            <span className="text-sm font-bold text-primary">
              {selectedCount} AUSGEWÄHLT
            </span>
            <button onClick={onDeselectAll} className="text-sm font-bold text-interactive hover:underline">
              AUSWAHL AUFHEBEN
            </button>
            <button onClick={onDeleteSelected} className="text-sm font-bold text-interactive-critical hover:underline">
              AUSWAHL LÖSCHEN
            </button>
          </>
        ) : (
          <span className="text-sm text-primary font-bold uppercase">
            {itemCount} {itemCount === 1 ? itemName : itemNamePlural}
          </span>
        )}
      </div>

      {children}

      {itemCount > 0 && (
        <div className="flex justify-end mt-6">
          {addNewButton}
        </div>
      )}
    </div>
  );
}