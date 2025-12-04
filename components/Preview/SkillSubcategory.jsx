import StarRatingItem from './StarRatingItem';

const ratingMap = {
  five: 5,
  four: 4,
  three: 3,
  two: 2,
  one: 1,
};

export default function SkillSubcategory({ data }) {
  return (
    <div>
      <h5>{data.name}</h5>
      <ul>
        {data.ratings.map((rating, index) => {
          // index is 0, 1, 2...
          return Object.keys(rating).map((ratingKey) => {
            // ratingKey is "Five", "Four", etc.
            const numericRating = ratingMap[ratingKey];
            const skills = rating[ratingKey];

            if (numericRating) {
              // Create a composite key like "0-Five", "0-Four", "1-Three", etc.
              return (
                <StarRatingItem
                  key={`${index}-${ratingKey}`}
                  rating={numericRating}
                  skills={skills}
                />
              );
            }
            return null;
          });
        })}
      </ul>
    </div>
  );
}
