import StarRating from './StarRating';

export default function StarRatingGlossary() {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <dt>
          <StarRating rating="5" />
        </dt>
        <dd className="">Ausgezeichnet</dd>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:tems-center">
        <dt>
          <StarRating rating="4" />
        </dt>
        <dd className="">Sehr Gut</dd>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <dt>
          <StarRating rating="3" />
        </dt>
        <dd className="">Gut</dd>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <dt>
          <StarRating rating="2" />
        </dt>
        <dd className="">Grundkenntnisse</dd>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <dt>
          <StarRating rating="1" />
        </dt>
        <dd className="">Theorie</dd>
      </div>
      <p>Zahlen in Klammern = Jahre Erfahrung</p>
    </dl>
  );
}
