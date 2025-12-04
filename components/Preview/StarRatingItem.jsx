import StarRating from './StarRating';

export default function StarRatingItem({ rating, skills }) {
  return (
    <li key={rating} className="flex flex-col gap-1  md:grid md:grid-cols-5">
      <StarRating rating={rating} />
      <p className="col-span-4">{skills.join(',')}</p>
    </li>
  );
}
