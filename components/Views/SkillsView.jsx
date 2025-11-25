'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronDown,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import StarRating from '../Preview/StarRating';

const ratingMap = { "five": 5, "four": 4, "three": 3, "two": 2, "one": 1 };

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

export default function SkillsView({ data }) {
  const [openCategories, setOpenCategories] = useState(new Set(data.map((_, i) => i)));
  const [openSubcategories, setOpenSubcategories] = useState(
    new Set(data.flatMap((cat, ci) => cat.subcategories.map((_, si) => `${ci}-${si}`)))
  );
  const [isAllOpen, setIsAllOpen] = useState(true);

  const toggleAll = () => {
    if (isAllOpen) {
      setOpenCategories(new Set());
      setOpenSubcategories(new Set());
    } else {
      setOpenCategories(new Set(data.map((_, i) => i)));
      setOpenSubcategories(new Set(data.flatMap((cat, ci) => cat.subcategories.map((_, si) => `${ci}-${si}`))));
    }
    setIsAllOpen(!isAllOpen);
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

  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      <div className="flex flex-col mb-4 gap-4">
        <h2 className="text-3xl font-bold text-primary font-zilla-slab">Skills</h2>
        <div className="flex items-center gap-4">
          <NavLink href="/content?section=projects">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-2" />Projekterfahrung
          </NavLink>
          <NavLink href="/content?section=hobbies">
            Hobbies<FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-2" />
          </NavLink>
        </div>
      </div>

      <div className="flex items-center justify-end mt-8 py-2 px-4 border-b border-border">
        <button
          onClick={toggleAll}
          className="text-sm font-bold text-interactive hover:underline"
        >
          {isAllOpen ? 'ALLE SCHLIESSEN' : 'ALLE ÖFFNEN'}
        </button>
      </div>

      <div className="border border-border bg-surface-rise">
        {data && data.length > 0 ? (
          data.map((category, catIndex) => {
            const isCatOpen = openCategories.has(catIndex);

            return (
              <div key={category.category} className="border-b border-border last:border-b-0">
                <div className="flex items-center gap-4 p-4 bg-[#CDBEDF]">
                  <div className="w-5 h-5 flex-shrink-0" />
                  <button onClick={() => toggleCategory(catIndex)} className="w-4">
                    <FontAwesomeIcon icon={isCatOpen ? faChevronDown : faChevronRight} />
                  </button>
                  <span className="flex-1 font-bold uppercase">{category.category}</span>
                </div>

                {isCatOpen && (
                  category.subcategories && category.subcategories.length > 0 ? (
                    category.subcategories.map((subCat, subIndex) => {
                      const subCatId = `${catIndex}-${subIndex}`;
                      const isSubCatOpen = openSubcategories.has(subCatId);
                      const skills = transformSkills(subCat);

                      return (
                        <div key={subCat.name} className="border-t border-border">
                          <div className="flex items-center gap-4 p-4 bg-[#E2E0EF]">
                            <div className="w-5 h-5 flex-shrink-0" />
                            <button onClick={() => toggleSubcategory(subCatId)} className="w-4">
                              <FontAwesomeIcon icon={isSubCatOpen ? faChevronDown : faChevronRight} />
                            </button>
                            <span className="flex-1 font-bold uppercase">{subCat.name}</span>
                          </div>

                          {isSubCatOpen && (
                            skills.length > 0 ? (
                              skills.map((skill) => (
                                <div key={skill.name} className="flex items-center gap-4 p-4">
                                  <div className="w-5 h-5 flex-shrink-0" />
                                  <div className="w-4" />

                                  <p className="flex-1">{skill.name}</p>
                                  <div className="flex-1">
                                    <StarRating rating={skill.rating} />
                                  </div>
                                  <div className="w-16" />
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-sm text-secondary text-center">Keine Skills in dieser Unterkategorie vorhanden.</div>
                            )
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-sm text-secondary text-center">Keine Unterkategorien in dieser Kategorie vorhanden.</div>
                  )
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-6 bg-surface-rise border border-border">
            <h3 className="text-lg font-semibold text-primary">Keine Skills vorhanden</h3>
            <p className="mt-2 text-sm text-secondary">In dieser Kategorie wurden noch keine Einträge hinzugefügt.</p>
          </div>
        )}
      </div>
    </div>
  );
}