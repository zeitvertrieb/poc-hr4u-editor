'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronDown,
  faPencilAlt,
  faTrash,
  faPlus,
  faCheck,
  faTimes,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import StarRating from '../Preview/StarRating';
import StarRatingInput from '../StarRatingInput';

const ratingMap = { "five": 5, "four": 4, "three": 3, "two": 2, "one": 1 };
const ratingKeyMap = { 5: "five", 4: "four", 3: "three", 2: "two", 1: "one" };

function transformSkills(subCategory) {
  const skills = [];
  if (!subCategory.ratings) return skills;
  for (const ratingObj of subCategory.ratings) {
    for (const key in ratingObj) {
      const ratingValue = ratingMap[key];
      if (ratingValue) {
        for (const skillName of ratingObj[key]) {
          skills.push({ name: skillName, rating: ratingValue });
        }
      }
    }
  }
  return skills;
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm font-medium text-interactive hover:text-interactive-hover">
      {children}
    </Link>
  );
}

const newCategoryDefault = { category: "", subcategories: [] };
const newSubCategoryDefault = { name: "", ratings: [] };
const newSkillDefault = { name: "", rating: 1 };

export default function SkillsEditor({ data, onChange }) {
  const [openCategories, setOpenCategories] = useState(new Set(data.map((_, i) => i)));
  const [openSubcategories, setOpenSubcategories] = useState(
    new Set(data.flatMap((cat, ci) => cat.subcategories.map((_, si) => `${ci}-${si}`)))
  );
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isAllOpen, setIsAllOpen] = useState(true);

  const [editItem, setEditItem] = useState(null);
  const [tempEditValue, setTempEditValue] = useState({ name: "", rating: 0 });

  const selectAllCheckboxRef = useRef(null);

  const allItemIds = useMemo(() => {
    const ids = { categories: {}, subcategories: {}, skills: {} };
    let totalSkills = 0;
    const allSkillIds = [];
    const allSubCatIds = [];
    const allCatIds = [];

    data.forEach((cat, ci) => {
      const catId = `cat-${ci}`;
      allCatIds.push(catId);
      const subCatIds = [];
      const skillIds = [];
      cat.subcategories.forEach((subCat, si) => {
        const subCatId = `subcat-${ci}-${si}`;
        allSubCatIds.push(subCatId);
        const subCatSkillIds = [];
        const transformed = transformSkills(subCat);

        transformed.forEach((skill, ski) => {
          const skillId = `skill-${ci}-${si}-${ski}`;
          allSkillIds.push(skillId);
          subCatSkillIds.push(skillId);
          ids.skills[skillId] = { parent: subCatId, catIndex: ci, subIndex: si, skill: skill };
        });

        subCatIds.push(subCatId);
        ids.subcategories[subCatId] = { parent: catId, children: subCatSkillIds };
        skillIds.push(...subCatSkillIds);
        totalSkills += subCatSkillIds.length;
      });
      ids.categories[catId] = { children: subCatIds, grandchildren: skillIds };
    });

    ids.totalSkillCount = totalSkills;
    ids.allSkillIds = allSkillIds;
    ids.allSubCatIds = allSubCatIds;
    ids.allCatIds = allCatIds;
    return ids;
  }, [data]);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      const allItemsCount = allItemIds.allCatIds.length + allItemIds.allSubCatIds.length + allItemIds.allSkillIds.length;
      const selectedCount = selectedItems.size;

      if (selectedCount > 0 && selectedCount < allItemsCount) {
        selectAllCheckboxRef.current.indeterminate = true;
      } else {
        selectAllCheckboxRef.current.indeterminate = false;
      }
    }
  }, [selectedItems, allItemIds]);

  const toggleAll = () => {
    if (isAllOpen) {
      setOpenCategories(new Set());
      setOpenSubcategories(new Set());
      setIsAllOpen(false);
    } else {
      setOpenCategories(new Set(data.map((_, i) => i)));
      setOpenSubcategories(new Set(data.flatMap((cat, ci) => cat.subcategories.map((_, si) => `${ci}-${si}`))));
      setIsAllOpen(true);
    }
  };
  const toggleCategory = (catIndex) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      next.has(catIndex) ? next.delete(catIndex) : next.add(catIndex);
      return next;
    });
  };
  const toggleSubcategory = (id) => {
    setOpenSubcategories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size > 0) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set([...allItemIds.allSkillIds, ...allItemIds.allSubCatIds, ...allItemIds.allCatIds]));
    }
  };

  const toggleSelection = (id, type) => {
    const newSelection = new Set(selectedItems);
    const isSelected = newSelection.has(id);
    let children = [];

    if (type === 'category' && allItemIds.categories[id]) {
      children = [...allItemIds.categories[id].children, ...allItemIds.categories[id].grandchildren];
    }
    if (type === 'subcategory' && allItemIds.subcategories[id]) {
      children = [...allItemIds.subcategories[id].children];
    }

    if (isSelected) {
      newSelection.delete(id);
      children.forEach(childId => newSelection.delete(childId));
    } else {
      newSelection.add(id);
      children.forEach(childId => newSelection.add(childId));
    }

    setSelectedItems(newSelection);
  };

  const selectedCount = selectedItems.size;
  const handleDeselectAll = () => setSelectedItems(new Set());


  const handleAdd = (type, catIndex, subIndex) => {
    let newData = [...data];

    if (type === 'category') {
      const newCat = { ...newCategoryDefault, subcategories: [] };
      newData = [newCat, ...data];
      onChange(newData);
      setEditItem({ type: 'category', catIndex: 0 });
      setTempEditValue({ name: newCat.category });
    }

    if (type === 'subcategory') {
      const newSubCat = { ...newSubCategoryDefault, ratings: [] };
      newData = data.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        return {
          ...cat,
          subcategories: [newSubCat, ...cat.subcategories]
        };
      });
      onChange(newData);
      setEditItem({ type: 'subcategory', catIndex: catIndex, subIndex: 0 });
      setTempEditValue({ name: newSubCat.name });
    }

    if (type === 'skill') {
      const newSkillName = newSkillDefault.name;
      const newSkillRating = newSkillDefault.rating;

      newData = data.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        return {
          ...cat,
          subcategories: cat.subcategories.map((subCat, si) => {
            if (si !== subIndex) return subCat;
            const newRatings = [...subCat.ratings];
            const ratingKey = ratingKeyMap[newSkillRating];
            let found = false;
            for (let i = 0; i < newRatings.length; i++) {
              if (newRatings[i][ratingKey]) {
                newRatings[i] = { ...newRatings[i], [ratingKey]: [newSkillName, ...newRatings[i][ratingKey]] };
                found = true;
                break;
              }
            }
            if (!found) {
              newRatings.unshift({ [ratingKey]: [newSkillName] });
            }
            return { ...subCat, ratings: newRatings };
          })
        };
      });

      onChange(newData);
      setEditItem({ type: 'skill', catIndex, subIndex, skillName: newSkillName, oldRating: newSkillRating });
      setTempEditValue({ name: newSkillName, rating: newSkillRating });
    }
  };

  const handleDelete = (type, catIndex, subIndex, skill) => {
    let newData = [...data];
    const newSelection = new Set(selectedItems);

    if (type === 'category') {
      const catId = `cat-${catIndex}`;
      newSelection.delete(catId);
      allItemIds.categories[catId]?.children.forEach(id => newSelection.delete(id));
      allItemIds.categories[catId]?.grandchildren.forEach(id => newSelection.delete(id));
      newData = data.filter((_, i) => i !== catIndex);
    }
    if (type === 'subcategory') {
      const subCatId = `subcat-${catIndex}-${subIndex}`;
      newSelection.delete(subCatId);
      allItemIds.subcategories[subCatId]?.children.forEach(id => newSelection.delete(id));

      newData = data.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        return {
          ...cat,
          subcategories: cat.subcategories.filter((_, i) => i !== subIndex)
        };
      });
    }
    if (type === 'skill') {
      const transformedSkills = transformSkills(data[catIndex].subcategories[subIndex]);
      const skillIndex = transformedSkills.findIndex(s => s.name === skill.name && s.rating === skill.rating);
      if (skillIndex !== -1) {
        const skillId = `skill-${catIndex}-${subIndex}-${skillIndex}`;
        newSelection.delete(skillId);
      }

      newData = data.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        return {
          ...cat,
          subcategories: cat.subcategories.map((subCat, si) => {
            if (si !== subIndex) return subCat;
            const ratingKey = ratingKeyMap[skill.rating];
            const newRatings = subCat.ratings.map(ratingObj => {
              if (!ratingObj[ratingKey]) return ratingObj;
              const newSkillList = ratingObj[ratingKey].filter(s => s !== skill.name);
              if (newSkillList.length === 0) {
                const { [ratingKey]: _, ...rest } = ratingObj;
                return rest;
              }
              return { ...ratingObj, [ratingKey]: newSkillList };
            }).filter(r => Object.keys(r).length > 0);
            return { ...subCat, ratings: newRatings };
          })
        };
      });
    }
    onChange(newData);
    setSelectedItems(newSelection);
    if (editItem && editItem.catIndex === catIndex) {
      setEditItem(null);
    }
  };

  const handleDeleteSelected = () => {
    let newData = [...data];
    const catsToDelete = new Set();
    const subCatsToDelete = new Map();
    const skillsToDelete = new Map();

    selectedItems.forEach(id => {
      if (id.startsWith('cat-')) catsToDelete.add(parseInt(id.split('-')[1]));
      if (id.startsWith('subcat-')) {
        const [, ci, si] = id.split('-').map(Number);
        if (!subCatsToDelete.has(ci)) subCatsToDelete.set(ci, new Set());
        subCatsToDelete.get(ci).add(si);
      }
      if (id.startsWith('skill-')) {
        const skillData = allItemIds.skills[id];
        if (skillData) {
          const { catIndex, subIndex, skill } = skillData;
          const key = `${catIndex}-${subIndex}`;
          if (!skillsToDelete.has(key)) skillsToDelete.set(key, new Set());
          skillsToDelete.get(key).add(skill);
        }
      }
    });

    newData = newData.map((cat, ci) => {
      if (catsToDelete.has(ci)) return null;
      cat.subcategories = cat.subcategories.map((subCat, si) => {
        if (subCatsToDelete.get(ci)?.has(si)) return null;
        const skillSetToRemove = skillsToDelete.get(`${ci}-${si}`);
        if (skillSetToRemove) {
          skillSetToRemove.forEach(skill => {
            const ratingKey = ratingKeyMap[skill.rating];
            let ratingObj = subCat.ratings.find(r => r[ratingKey]);
            if (ratingObj) {
              ratingObj[ratingKey] = ratingObj[ratingKey].filter(s => s !== skill.name);
              if (ratingObj[ratingKey].length === 0) delete ratingObj[ratingKey];
              subCat.ratings = subCat.ratings.filter(r => Object.keys(r).length > 0);
            }
          });
        }
        return subCat;
      }).filter(Boolean);
      return cat;
    }).filter(Boolean);

    onChange(newData);
    setSelectedItems(new Set());
    setEditItem(null);
  };

  const handleEditClick = (skill, catIndex, subIndex) => {
    setEditItem({ type: 'skill', catIndex, subIndex, skillName: skill.name, oldRating: skill.rating });
    setTempEditValue({ name: skill.name, rating: skill.rating });
  };

  const handleCancel = () => {
    if (editItem?.type === 'category' && data[editItem.catIndex]?.category === newCategoryDefault.category) {
      handleDelete('category', editItem.catIndex);
    }
    if (editItem?.type === 'subcategory' && data[editItem.catIndex]?.subcategories[editItem.subIndex]?.name === newSubCategoryDefault.name) {
      handleDelete('subcategory', editItem.catIndex, editItem.subIndex);
    }
    if (editItem?.type === 'skill' && editItem.skillName === newSkillDefault.name) {
      handleDelete('skill', editItem.catIndex, editItem.subIndex, { name: newSkillDefault.name, rating: 1 });
    }
    setEditItem(null);
  };

  const handleSave = () => {
    if (!editItem) return;
    let newData = [...data];
    const { type, catIndex, subIndex, skillName, oldRating } = editItem;

    if (type === 'category') {
      if (!tempEditValue.name || (tempEditValue.name === newCategoryDefault.category && data.length > 1)) {
        handleDelete('category', catIndex);
      } else {
        newData[catIndex].category = tempEditValue.name;
        onChange(newData);
      }
    }
    if (type === 'subcategory') {
      if (!tempEditValue.name || (tempEditValue.name === newSubCategoryDefault.name && data[catIndex].subcategories.length > 1)) {
        handleDelete('subcategory', catIndex, subIndex);
      } else {
        newData[catIndex].subcategories[subIndex].name = tempEditValue.name;
        onChange(newData);
      }
    }
    if (type === 'skill') {
      const { name: newName, rating: newRating } = tempEditValue;
      if (!newName || (newName === newSkillDefault.name && oldRating === 1)) {
        handleDelete('skill', catIndex, subIndex, { name: skillName, rating: oldRating });
      } else {
        const subCat = newData[catIndex].subcategories[subIndex];
        const oldRatingKey = ratingKeyMap[oldRating];
        let oldRatingObj = subCat.ratings.find(r => r[oldRatingKey]);
        if (oldRatingObj) {
          oldRatingObj[oldRatingKey] = oldRatingObj[oldRatingKey].filter(s => s !== skillName);
          if (oldRatingObj[oldRatingKey].length === 0) delete oldRatingObj[oldRatingKey];
        }
        const newRatingKey = ratingKeyMap[newRating];
        let newRatingObj = subCat.ratings.find(r => r[newRatingKey]);
        if (newRatingObj) {
          newRatingObj[newRatingKey].push(newName);
        } else {
          subCat.ratings.push({ [newRatingKey]: [newName] });
        }
        subCat.ratings = subCat.ratings.filter(r => Object.keys(r).length > 0);
        onChange(newData);
      }
    }
    setEditItem(null);
  };

  const isEditingItem = editItem !== null;
  const isSelectionActive = selectedItems.size > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold font-zilla-slab">Skills</h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=projects">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Projekterfahrung
          </NavLink>
          <NavLink href="/content?section=hobbies">
            Hobbies<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8 py-2 px-4 border-b border-border">
        <input
          type="checkbox"
          className="h-5 w-5 text-interactive border-interactive focus:ring-interactive"
          ref={selectAllCheckboxRef}
          checked={isSelectionActive && selectedItems.size === (allItemIds.allCatIds.length + allItemIds.allSubCatIds.length + allItemIds.allSkillIds.length)}
          onChange={handleSelectAll}
          disabled={isEditingItem}
        />
        {isSelectionActive ? (
          <>
            <span className="text-sm font-bold">
              {selectedCount} {selectedCount === 1 ? 'ELEMENT' : 'ELEMENTE'} AUSGEWÄHLT
            </span>
            <button
              onClick={handleDeselectAll}
              className="text-sm font-bold text-interactive hover:text-interactive-hover"
            >
              AUSWAHL AUFHEBEN
            </button>
            <button
              onClick={handleDeleteSelected}
              className="text-sm font-bold text-interactive-critical hover:text-interactive-critical-hover"
            >
              AUSWAHL LÖSCHEN
            </button>
          </>
        ) : (
          <span className="text-sm font-bold uppercase">
            {allItemIds.totalSkillCount} {allItemIds.totalSkillCount === 1 ? 'ELEMENT' : 'ELEMENTE'}
          </span>
        )}
        <button
          onClick={toggleAll}
          className="text-sm font-bold text-interactive hover:text-interactive-hover ml-auto"
        >
          {isAllOpen ? 'ALLE SCHLIESSEN' : 'ALLE ÖFFNEN'}
        </button>
      </div>

      <div className="border border-border bg-surface-rise">
        {data.length > 0 ? (
          data.map((category, catIndex) => {
            const catId = `cat-${catIndex}`;
            const isCatOpen = openCategories.has(catIndex);
            const isCatSelected = selectedItems.has(catId);
            const isThisCatEditing = editItem?.type === 'category' && editItem.catIndex === catIndex;

            return (
              <div key={catId} className="border-b border-border last:border-b-0">
                <div className={`flex items-center gap-4 p-4 bg-[#CDBEDF]`}>
                  {isThisCatEditing ? (
                    <div className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <input type="checkbox" className="h-5 w-5 text-interactive border-interactive focus:ring-interactive" checked={isCatSelected} onChange={() => toggleSelection(catId, 'category')} disabled={isEditingItem} />
                  )}
                  <button onClick={() => toggleCategory(catIndex)} className="w-4" disabled={isThisCatEditing}>
                    <FontAwesomeIcon icon={isCatOpen ? faChevronDown : faChevronRight} />
                  </button>

                  {isThisCatEditing ? (
                    <input type="text" placeholder='z.B. IT-Skills' value={tempEditValue.name} onChange={(e) => setTempEditValue({ name: e.target.value })} className="flex-1 p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" />
                  ) : (
                    <span className="flex-1 font-bold uppercase">{category.category}</span>
                  )}

                  {isThisCatEditing ? (
                    <div className="flex gap-4 w-16 justify-end">
                      <button onClick={handleSave} className="text-interactive hover:text-interactive-hover" title="Speichern"><FontAwesomeIcon icon={faCheck} className="h-4 w-4" /></button>
                      <button onClick={handleCancel} className="text-interactive hover:text-interactive-hover" title="Abbrechen"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <button onClick={() => handleAdd('subcategory', catIndex)} className="flex items-center justify-center text-interactive bg-surface-rise hover:text-interactive-hover hover:border-interactive-hover border border-interactive" disabled={isEditingItem}><FontAwesomeIcon icon={faPlus} className="py-1.5 px-1" /></button>
                      <button onClick={() => handleDelete('category', catIndex)} className="text-interactive-critical hover:text-interactive-critical-hover" disabled={isEditingItem}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  )}
                </div>

                {isCatOpen && category.subcategories.map((subCat, subIndex) => {
                  const subCatId = `subcat-${catIndex}-${subIndex}`;
                  const isSubCatOpen = openSubcategories.has(`${catIndex}-${subIndex}`);
                  const isSubCatSelected = selectedItems.has(subCatId);
                  const skills = transformSkills(subCat);
                  const isThisSubCatEditing = editItem?.type === 'subcategory' && editItem.catIndex === catIndex && editItem.subIndex === subIndex;

                  return (
                    <div key={subCatId} className="border-t border-border">
                      <div className={`flex items-center gap-4 p-4 bg-[#E2E0EF]`}>
                        {isThisSubCatEditing ? (
                          <div className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <input type="checkbox" className="h-5 w-5 text-interactive border-interactive focus:ring-interactive" checked={isSubCatSelected} onChange={() => toggleSelection(subCatId, 'subcategory')} disabled={isEditingItem} />
                        )}
                        <button onClick={() => toggleSubcategory(`${catIndex}-${subIndex}`)} className="w-4" disabled={isThisSubCatEditing}>
                          <FontAwesomeIcon icon={isSubCatOpen ? faChevronDown : faChevronRight} />
                        </button>

                        {isThisSubCatEditing ? (
                          <input type="text" placeholder="z.B. Analyse-Methoden" value={tempEditValue.name} onChange={(e) => setTempEditValue({ name: e.target.value })} className="flex-1 p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" />
                        ) : (
                          <span className="flex-1 font-bold uppercase">{subCat.name}</span>
                        )}

                        {isThisSubCatEditing ? (
                          <div className="flex gap-4 w-16 justify-end">
                            <button onClick={handleSave} className="text-interactive hover:text-interactive-hover" title="Speichern"><FontAwesomeIcon icon={faCheck} className="h-4 w-4" /></button>
                            <button onClick={handleCancel} className="text-interactive hover:text-interactive-hover" title="Abbrechen"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <button onClick={() => handleAdd('skill', catIndex, subIndex)} className="flex items-center justify-center text-interactive bg-surface-rise hover:text-interactive-hover hover:border-interactive-hover border border-interactive" disabled={isEditingItem}><FontAwesomeIcon icon={faPlus} className="py-1.5 px-1" /></button>
                            <button onClick={() => handleDelete('subcategory', catIndex, subIndex)} className="text-interactive-critical hover:text-interactive-critical-hover" disabled={isEditingItem}><FontAwesomeIcon icon={faTrash} /></button>
                          </div>
                        )}
                      </div>

                      {isSubCatOpen && skills.map((skill, skillIndex) => {
                        const skillId = `skill-${catIndex}-${subIndex}-${skillIndex}`;
                        const isSkillSelected = selectedItems.has(skillId);
                        const isThisSkillEditing = editItem?.type === 'skill' && editItem.catIndex === catIndex && editItem.subIndex === subIndex && editItem.skillName === skill.name;

                        return (
                          <div key={skillId} className={`flex items-center gap-4 p-4 ${isThisSkillEditing ? 'bg-white shadow-md' : ''}`}>
                            {isThisSkillEditing ? (
                              <div className="w-5 h-5 flex-shrink-0" />
                            ) : (
                              <input type="checkbox" className="h-5 w-5 text-interactive border-interactive focus:ring-interactive flex-shrink-0" checked={isSkillSelected} onChange={() => toggleSelection(skillId, 'skill')} disabled={isEditingItem} />
                            )}

                            <div className="flex-1">
                              {isThisSkillEditing ? (
                                <input type="text" placeholder='z.B. Fehler-Analyse' value={tempEditValue.name} onChange={(e) => setTempEditValue(prev => ({ ...prev, name: e.target.value }))} className="w-full p-1 bg-surface-rise border-b border-border focus:border-interactive-active focus:outline-none" />
                              ) : (
                                <p>{skill.name}</p>
                              )}
                            </div>

                            <div className="flex-1">
                              {isThisSkillEditing ? (
                                <StarRatingInput
                                  rating={tempEditValue.rating}
                                  onChange={(newRating) => setTempEditValue(prev => ({ ...prev, rating: newRating }))}
                                />
                              ) : (
                                <StarRating rating={skill.rating} />
                              )}
                            </div>

                            <div className="flex gap-4 w-16 justify-end">
                              {isThisSkillEditing ? (
                                <>
                                  <button onClick={handleSave} className="text-interactive hover:text-interactive-hover" title="Speichern"><FontAwesomeIcon icon={faCheck} className="h-4 w-4" /></button>
                                  <button onClick={handleCancel} className="text-interactive hover:text-interactive-hover" title="Abbrechen"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => handleEditClick(skill, catIndex, subIndex)} className="text-interactive hover:text-interactive-hover" title="Bearbeiten" disabled={isEditingItem}><FontAwesomeIcon icon={faPencilAlt} className="h-4 w-4" /></button>
                                  <button onClick={() => handleDelete('skill', catIndex, subIndex, skill)} className="text-interactive-critical hover:text-interactive-critical-hover" title="Löschen" disabled={isEditingItem}><FontAwesomeIcon icon={faTrash} className="h-4 w-4" /></button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">Keine Skills vorhanden</h3>
            <p className="mt-2 text-sm text-secondary">Fügen Sie Ihre erste Kategorie hinzu, um zu beginnen.</p>
            <button
              onClick={() => handleAdd('category')}
              className="mt-4 flex items-center gap-2 mx-auto py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              KATEGORIE HINZUFÜGEN
            </button>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleAdd('category')}
            className="flex items-center gap-2 py-2 px-4 bg-surface-rise border-2 border-interactive text-interactive font-bold hover:border-interactive-hover hover:text-interactive-hover"
            disabled={isEditingItem}
          >
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            KATEGORIE HINZUFÜGEN
          </button>
        </div>
      )}
    </div>
  );
}