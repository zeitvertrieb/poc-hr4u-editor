'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

export default function StarRatingInput({ rating, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex text-primary">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          type="button"
          key={value}
          className="p-1"
          onClick={() => onChange(value)}
          onMouseEnter={() => setHoverRating(value)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <FontAwesomeIcon
            icon={value <= (hoverRating || rating) ? faStarSolid : faStarRegular}
            className="h-4 w-4"
          />
        </button>
      ))}
    </div>
  );
}